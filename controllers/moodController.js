const dbPool = require('../dbService')
const Mood = require('../models/Mood.js');
require('dotenv').config();



async function getAllMoods() {
    try {
        const res = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM mood JOIN mood_emotion ON mood.mood_id=mood_emotion.mood_id 
                                JOIN emotion ON emotion.emotion_id=mood_emotion.emotion_id
                                JOIN context ON context.context_id=mood.context_id
                                JOIN context_context_type ON context.context_id = context_context_type.context_id 
                                JOIN context_type ON context_type.context_type_id= context_context_type.context_type_id `

            dbPool.query(query, (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result);
            });
        });

        console.log(res);
        return res;

    } catch (error) {
        console.log(error);
    }
}

async function getMoodsByUser(user, page, limit, sort) {

    var offset = limit * (page - 1);
    try {
        switch (sort) {
            case "asc": var moodQuery = `SELECT * FROM mood JOIN context ON context.context_id = mood.context_id WHERE user_id = ? ORDER BY mood_timestamp ASC LIMIT ? OFFSET ? `
                break;
            case "desc": var moodQuery = `SELECT * FROM mood JOIN context ON context.context_id = mood.context_id WHERE user_id = ? ORDER BY mood_timestamp DESC LIMIT ? OFFSET ? `
                break;
            default: var moodQuery = `SELECT * FROM mood JOIN context ON context.context_id = mood.context_id WHERE user_id = ? ORDER BY mood_timestamp DESC LIMIT ? OFFSET ? `

        }

        var emotionQuery = `SELECT emotion_name, emotion_level, emotion_colour, emotion_icon FROM mood JOIN mood_emotion ON mood.mood_id = mood_emotion.mood_id 
                                JOIN emotion ON emotion.emotion_id = mood_emotion.emotion_id 
                                 WHERE mood.mood_id = ?`

        var contextQuery = `SELECT context_type_name, context_icon FROM mood JOIN context ON context.context_id = mood.context_id 
                                JOIN context_context_type ON context.context_id = context_context_type.context_id
                                JOIN context_type ON context_type.context_type_id = context_context_type.context_type_id 
                                WHERE mood.context_id = ? `


        let moodArray = await new Promise((resolve, reject) => {
            dbPool.getConnection((err, connection) => {
                connection.beginTransaction((err) => {
                    if (err) {
                        connection.release(); reject(err)
                    } else {
                        connection.query(moodQuery, [user.user_id, +limit, +offset], (err, moods) => {
                            if (err) { connection.release(); reject(err) };
                            if (!moods) return reject(new Error(err.message));
                            if (moods.length > 0) {
                                let promises = moods.map(async (mood) => {
                                    mood.emotion = await new Promise((resolve, reject) => {
                                        connection.query(emotionQuery, [mood.mood_id], (err, emotions) => {
                                            if (err) { connection.release(); reject(err) };
                                            resolve(emotions);
                                        })
                                    });
                                    mood.context = await new Promise((resolve, reject) => {
                                        connection.query(contextQuery, [mood.context_id], (err, context) => {
                                            if (err) { connection.release(); reject(err) };
                                            resolve(context);
                                        })
                                    });
                                    return mood;
                                });
                                Promise.all(promises).then(
                                    moods => {
                                        resolve(moods);
                                    }
                                )
                            } else { return null }

                        });
                    }

                });
            });
        });
        return moodArray;
    } catch (error) {
        console.log(error);
        throw error;
    }

}


async function createMood(user, req) {
    const { enjoyment, sadness, anger, contempt, disgust, fear, surprise, Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping, comment, timestamp } = req.body;
    const newMood = new Mood(user.user_id, timestamp, comment, enjoyment, sadness, anger, contempt, disgust, fear, surprise, Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping);

    try {
        await new Promise((resolve, reject) => {

            const query1 = `INSERT INTO context (context_id, context_comment, context_timestamp) VALUES (null, ?, current_timestamp());`
            const query2 = `SET @last_context_id = LAST_INSERT_ID();`
            const query3 = `INSERT INTO context_context_type (context_context_type_id,context_id, context_type_id) VALUES (null, @last_context_id,?);`
            const query4 = `INSERT INTO mood (mood_id, mood_timestamp, user_id, context_id) VALUES (null, ?, ?, @last_context_id );`
            const query5 = `SET @last_mood_id = LAST_INSERT_ID();`
            const query6 = `INSERT INTO mood_emotion (mood_emotion_id, emotion_level, mood_id, emotion_id) VALUES (null, ?, @last_mood_id, ?);`

            dbPool.getConnection((err, connection) => {
                if (err) return reject(err);
                connection.beginTransaction((err) => {
                    if (err) { connection.release(); return reject(err) };
                    connection.query(query1, [newMood.context_comment], (err, result) => {
                        if (err) connection.rollback(() => { connection.release(); return reject(err) })
                        connection.query(query2, (err, result) => {
                            if (err) connection.rollback(() => { connection.release(); return reject(err) })

                            for (let context in newMood.context) {
                                if (newMood.context[context]) {
                                    var contextType;

                                    switch (context.toString()) {
                                        case "romance": contextType = 1; break;
                                        case "family": contextType = 2; break;
                                        case "work": contextType = 3; break;
                                        case "holiday": contextType = 4; break;
                                        case "lonely": contextType = 5; break;
                                        case "exercise": contextType = 6; break;
                                        case "friends": contextType = 7; break;
                                        case "shopping": contextType = 8; break;
                                    }
                                    connection.query(query3, [contextType], (err, result) => {
                                        if (err) connection.rollback(() => { connection.release(); return reject(err) })

                                    });
                                }
                            }
                            connection.query(query4, [newMood.timestamp, newMood.user_id], (err, result) => {
                                if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                connection.query(query5, [newMood.user_id], (err, result) => {
                                    if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                    connection.query(query6, [newMood.emotion.enjoyment, 1], (err, result) => {
                                        if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                        connection.query(query6, [newMood.emotion.sadness, 2], (err, result) => {
                                            if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                            connection.query(query6, [newMood.emotion.anger, 3], (err, result) => {
                                                if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                                connection.query(query6, [newMood.emotion.contempt, 4], (err, result) => {
                                                    if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                                    connection.query(query6, [newMood.emotion.disgust, 5], (err, result) => {
                                                        if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                                        connection.query(query6, [newMood.emotion.fear, 6], (err, result) => {
                                                            if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                                            connection.query(query6, [newMood.emotion.surprise, 7], (err, result) => {
                                                                if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                                                connection.commit((err) => {
                                                                    if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                                                    console.log('success!');
                                                                    resolve(console.log("Mood successfully added!"));
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.log(error);
        throw error;
    }

}


async function updateMood(id, reqBody) {
    const { contextComment } = reqBody;
    const { Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping } = reqBody;
    const newContext = { Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping };


    await new Promise((resolve, reject) => {
        const query1 = `SELECT @contextId := context_id FROM mood WHERE mood_id = ?;`
        const query2 = `DELETE FROM context_context_type WHERE context_id = @contextId`
        const query3 = `INSERT INTO context_context_type (context_context_type_id,context_id, context_type_id) VALUES (null, @contextId, ? );`
        const query4 = `UPDATE context SET context_comment = ?, context_timestamp = current_timestamp() WHERE context.context_id = @contextId;`
        dbPool.getConnection((err, connection) => {
            if (err) return reject(err);
            connection.beginTransaction((err) => {
                if (err) { connection.release(); return reject(err) };
                connection.query(query1, [+id], (err, result) => {
                    if (err) connection.rollback(() => { connection.release(); return reject(err) })
                    connection.query(query2, [+id], (err, result) => {
                        if (err) connection.rollback(() => { connection.release(); return reject(err) })

                        for (let context in newContext) {

                            if (newContext[context]) {
                                var contextType;

                                switch (context.toString()) {
                                    case "Romance": contextType = 1; break;
                                    case "Family": contextType = 2; break;
                                    case "Work": contextType = 3; break;
                                    case "Holiday": contextType = 4; break;
                                    case "Lonely": contextType = 5; break;
                                    case "Exercise": contextType = 6; break;
                                    case "Friends": contextType = 7; break;
                                    case "Shopping": contextType = 8; break;
                                }
                                connection.query(query3, [contextType], (err, result) => {
                                    if (err) connection.rollback(() => { connection.release(); return reject(err) })

                                });
                            }
                        }
                        connection.query(query4, [contextComment.toString()], (err, result) => {
                            if (err) connection.rollback(() => { connection.release(); return reject(err) })
                            connection.commit((err) => {
                                if (err) connection.rollback(() => { connection.release(); return reject(err) });
                                resolve(console.log("Mood with ID: " + id + " successfully updated!"));
                                connection.release()
                            });
                        });
                    });
                });
            });
        });
    });
}

async function deleteMood(id) {

    await new Promise((resolve, reject) => {

        const query1 = `SET @moodId = ?;`
        const query2 = `SELECT @contextId := context_id FROM mood WHERE mood_id = @moodId;`
        const query3 = `DELETE FROM context_context_type WHERE context_id = @contextId;`
        const query4 = `DELETE FROM mood_emotion WHERE mood_id= @moodId;`
        const query5 = `DELETE FROM mood WHERE mood_id = @moodId;`
        const query6 = `DELETE FROM context WHERE context_id = @contextId;`


        dbPool.getConnection((err, connection) => {
            if (err) return reject(err);
            connection.beginTransaction((err) => {
                if (err) { connection.release(); return reject(err) };
                connection.query(query1, [+id], (err, result) => {
                    if (err) connection.rollback(() => { connection.release(); return reject(err) })
                    connection.query(query2, (err, result) => {
                        if (err) connection.rollback(() => { connection.release(); return reject(err) })
                        connection.query(query3, (err, result) => {
                            if (err) connection.rollback(() => { connection.release(); return reject(err) })
                            connection.query(query4, (err, result) => {
                                if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                connection.query(query5, (err, result) => {
                                    if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                    connection.query(query6, (err, result) => {
                                        if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                        connection.commit((err) => {
                                            if (err) connection.rollback(() => { connection.release(); return reject(err) })
                                            resolve(console.log("Mood with ID: " + id + " successfully removed!"));
                                            connection.release()
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}


const getEmotions = async () => {
    try {
        const res = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM emotion;`;
            dbPool.query(query, (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result);
            });
        });
        return res
    } catch (error) {
        throw error;
    }
}


const getContextType = async () => {
    try {
        const res = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM context_type;`;
            dbPool.query(query, (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result);
            });
        });
        return res
    } catch (error) {
        throw error;
    }
}

const getPageCount = async (user, limit) => {
    try {
        const query = "Select count(*) as TotalCount from mood WHERE user_id = ?";
        const res = await new Promise((resolve, reject) => {
            dbPool.query(query, [user.user_id], (err, result) => {
                if (err) reject(err);
                const totalMoods = result[0].TotalCount;
                const totalPages = Math.ceil(totalMoods / limit);
                resolve(totalPages);

            });
        });
        return res
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getMoodsByUser,
    createMood,
    getContextType,
    getEmotions,
    updateMood,
    deleteMood,
    getAllMoods,
    getPageCount
};