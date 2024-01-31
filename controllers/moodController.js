const dbPool = require('../dbService')
const Mood = require('../models/Mood.js');


const getMoodsByUser = async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const user = req.user;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let sort = req.query.sort || 'desc';
    let search = req.query.search || '';
    var offset = limit * (page - 1);

    try {
        switch (sort) {
            case "asc": var moodQuery = `SELECT DISTINCT mood_id,mood_timestamp,user_id,mood.context_id,context_comment,context_timestamp FROM mood LEFT JOIN context ON context.context_id = mood.context_id LEFT JOIN context_context_type ON context.context_id = 
                                         context_context_type.context_id LEFT JOIN context_type ON context_type.context_type_id = context_context_type.context_type_id WHERE user_id = ? AND (context_comment LIKE CONCAT('%',?,'%') OR context_type_name LIKE CONCAT('%',?,'%')) ORDER BY mood_timestamp ASC LIMIT ? OFFSET ? `
                break;
            case "desc": var moodQuery = `SELECT DISTINCT mood_id,mood_timestamp,user_id,mood.context_id,context_comment,context_timestamp FROM mood LEFT JOIN context ON context.context_id = mood.context_id LEFT JOIN context_context_type ON context.context_id = 
                                          context_context_type.context_id LEFT JOIN context_type ON context_type.context_type_id = context_context_type.context_type_id WHERE user_id = ? AND (context_comment LIKE CONCAT('%',?,'%')  OR context_type_name LIKE CONCAT('%',?,'%')) ORDER BY mood_timestamp DESC LIMIT ? OFFSET ? `
                break;
            default: var moodQuery = `SELECT DISTINCT mood_id,mood_timestamp,user_id,mood.context_id,context_comment,context_timestamp FROM mood LEFT JOIN context ON context.context_id = mood.context_id LEFT JOIN context_context_type ON context.context_id = context_context_type.context_id
                                      LEFT JOIN context_type ON context_type.context_type_id = context_context_type.context_type_id WHERE user_id = ? AND (context_comment LIKE CONCAT('%',?,'%') OR context_type_name LIKE CONCAT('%',?,'%')) ORDER BY mood_timestamp DESC LIMIT ? OFFSET ? `

        }

        var emotionQuery = `SELECT emotion_name, emotion_level, emotion_colour, emotion_icon FROM mood JOIN mood_emotion ON mood.mood_id = mood_emotion.mood_id 
                                JOIN emotion ON emotion.emotion_id = mood_emotion.emotion_id 
                                 WHERE mood.mood_id = ?`

        var contextQuery = `SELECT context_type_name, context_icon FROM mood JOIN context ON context.context_id = mood.context_id 
                                JOIN context_context_type ON context.context_id = context_context_type.context_id
                                JOIN context_type ON context_type.context_type_id = context_context_type.context_type_id 
                                WHERE mood.context_id = ? `

        const totalPages = await getPageCount(user, limit, search);
        const contextType = await getContextType();

        dbPool.getConnection((err, connection) => {
            connection.beginTransaction((err) => {
                if (err) { connection.release(); throw err }
                connection.query(moodQuery, [user.user_id, search, search, +limit, +offset], async (err, moods) => {
                    if (err) { connection.release(); throw err };
                    if (!moods) { connection.release(); throw new Error(err.message); }
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
                                connection.commit(() => {
                                    connection.release();
                                    return res.render('viewMoods',
                                        { moods, user, totalPages, contextType })
                                })
                            }
                        ).catch((err)=>{
                            console.log(err)
                            return res.render('viewMoods', { moods: null, user, totalPages: 1, errMessage: "Cannot show Moods at this moment, please try again later...", contextType })
                        })
                    } else {                      
                        connection.release(); return res.render('viewMoods', { moods: null, user, totalPages: 1, contextType });
                    }
                });
            });
        });

    } catch (error) {
        res.render('viewMoods',
            { moods: null, user, totalPages: 1, errMessage: "Cannot show Moods at this moment, please try again later...", contextType });
        console.log(err)
    }

}

const getAddMood = async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const user = req.user;

    const contextType = await getContextType()
        .then(contextType => { return contextType })
        .catch(err => {
            res.redirect('/', { errMessage: "Error cannot add Moods at this moment, please try again later..." });
            console.log(err)

        });
    getEmotions()
        .then(emotions => { res.render('addMood', { emotions, contextType, user }) })
        .catch(err => {
            res.redirect('/', { errMessage: "Error cannot add Moods at this moment, please try again later..." });
            console.log(err)
        });
}

const createMood = (req, res) => {
    const { user_id } = req.user
    const { enjoyment, sadness, anger, contempt, disgust, fear, surprise, Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping, comment, timestamp } = req.body;
    const newMood = new Mood(user_id, timestamp, comment, enjoyment, sadness, anger, contempt, disgust, fear, surprise, Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping);

    try {


        const query1 = `INSERT INTO context (context_id, context_comment, context_timestamp) VALUES (null, ?, current_timestamp());`
        const query2 = `SET @last_context_id = LAST_INSERT_ID();`
        const query3 = `INSERT INTO context_context_type (context_context_type_id,context_id, context_type_id) VALUES (null, @last_context_id,?);`
        const query4 = `INSERT INTO mood (mood_id, mood_timestamp, user_id, context_id) VALUES (null, ?, ?, @last_context_id );`
        const query5 = `SET @last_mood_id = LAST_INSERT_ID();`
        const query6 = `INSERT INTO mood_emotion (mood_emotion_id, emotion_level, mood_id, emotion_id) VALUES (null, ?, @last_mood_id, ?);`

        dbPool.getConnection((err, connection) => {
            if (err) throw err;
            connection.beginTransaction((err) => {
                if (err) { connection.release(); throw err };
                connection.query(query1, [newMood.context_comment], (err, result) => {
                    if (err) connection.rollback(() => { connection.release(); throw err })
                    connection.query(query2, (err, result) => {
                        if (err) connection.rollback(() => { connection.release(); throw err })

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
                                    if (err) connection.rollback(() => { connection.release(); throw err })

                                });
                            }
                        }
                        connection.query(query4, [newMood.timestamp, newMood.user_id], (err, result) => {
                            if (err) connection.rollback(() => { connection.release(); throw err })
                            connection.query(query5, [newMood.user_id], (err, result) => {
                                if (err) connection.rollback(() => { connection.release(); throw err })
                                connection.query(query6, [newMood.emotion.enjoyment, 1], (err, result) => {
                                    if (err) connection.rollback(() => { connection.release(); throw err })
                                    connection.query(query6, [newMood.emotion.sadness, 2], (err, result) => {
                                        if (err) connection.rollback(() => { connection.release(); throw err })
                                        connection.query(query6, [newMood.emotion.anger, 3], (err, result) => {
                                            if (err) connection.rollback(() => { connection.release(); throw err })
                                            connection.query(query6, [newMood.emotion.contempt, 4], (err, result) => {
                                                if (err) connection.rollback(() => { connection.release(); throw err })
                                                connection.query(query6, [newMood.emotion.disgust, 5], (err, result) => {
                                                    if (err) connection.rollback(() => { connection.release(); throw err })
                                                    connection.query(query6, [newMood.emotion.fear, 6], (err, result) => {
                                                        if (err) connection.rollback(() => { connection.release(); throw err })
                                                        connection.query(query6, [newMood.emotion.surprise, 7], (err, result) => {
                                                            if (err) connection.rollback(() => { connection.release(); throw err })
                                                            connection.commit((err) => {
                                                                if (err) connection.rollback(() => { connection.release(); throw err })
                                                                console.log("Mood successfully added!")
                                                                return res.redirect('/mood/view')

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

    } catch (err) {
        res.redirect('/mood/add', { errMessage: "Error could not add Mood, please try again..." })
        console.log(err)
    }

}

const updateMood = (req, res) => {

    const { contextComment } = req.body;
    const { Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping } = req.body;
    const newContext = { Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping };
    const { id } = req.params;


    const query1 = `SELECT @contextId := context_id FROM mood WHERE mood_id = ?;`
    const query2 = `DELETE FROM context_context_type WHERE context_id = @contextId`
    const query3 = `INSERT INTO context_context_type (context_context_type_id,context_id, context_type_id) VALUES (null, @contextId, ? );`
    const query4 = `UPDATE context SET context_comment = ?, context_timestamp = current_timestamp() WHERE context.context_id = @contextId;`

    try {
        dbPool.getConnection((err, connection) => {
            if (err) throw err;
            connection.beginTransaction((err) => {
                if (err) { connection.release(); throw err };
                connection.query(query1, [+id], (err, result) => {
                    if (err) connection.rollback(() => { connection.release(); throw err })
                    connection.query(query2, [+id], (err, result) => {
                        if (err) connection.rollback(() => { connection.release(); throw err })

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
                                    if (err) connection.rollback(() => { connection.release(); throw err })

                                });
                            }
                        }
                        connection.query(query4, [contextComment.toString()], (err, result) => {
                            if (err) connection.rollback(() => { connection.release(); throw err })
                            connection.commit((err) => {
                                if (err) connection.rollback(() => { connection.release(); throw err });
                                console.log("Mood with ID: " + id + " successfully updated!");
                                connection.release()
                                return res.redirect('/mood/view')
                            });
                        });
                    });
                });
            });
        });
    } catch (err) {
        res.redirect('/mood/view', { errMessage: "Error Mood could not be edited, please try again..." })
        console.log(err)
    }

}

const deleteMood = (req, res) => {

    const { id } = req.params;
    const query1 = `SET @moodId = ?;`
    const query2 = `SELECT @contextId := context_id FROM mood WHERE mood_id = @moodId;`
    const query3 = `DELETE FROM context_context_type WHERE context_id = @contextId;`
    const query4 = `DELETE FROM mood_emotion WHERE mood_id= @moodId;`
    const query5 = `DELETE FROM mood WHERE mood_id = @moodId;`
    const query6 = `DELETE FROM context WHERE context_id = @contextId;`

    try {
        dbPool.getConnection((err, connection) => {
            if (err) throw err;
            connection.beginTransaction((err) => {
                if (err) { connection.release(); throw err };
                connection.query(query1, [+id], (err, result) => {
                    if (err) connection.rollback(() => { connection.release(); throw err })
                    connection.query(query2, (err, result) => {
                        if (err) connection.rollback(() => { connection.release(); throw err })
                        connection.query(query3, (err, result) => {
                            if (err) connection.rollback(() => { connection.release(); throw err })
                            connection.query(query4, (err, result) => {
                                if (err) connection.rollback(() => { connection.release(); throw err })
                                connection.query(query5, (err, result) => {
                                    if (err) connection.rollback(() => { connection.release(); throw err })
                                    connection.query(query6, (err, result) => {
                                        if (err) connection.rollback(() => { connection.release(); throw err })
                                        connection.commit((err) => {
                                            if (err) connection.rollback(() => { connection.release(); throw err })
                                            console.log("Mood with ID: " + id + " successfully removed!");
                                            connection.release()
                                            return res.redirect('/mood/view')
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    } catch (err) {
        res.redirect('/mood/view', { errMessage: "Error Mood could not be deleted, please try again..." })
        console.log(err)

    }

}

const getEmotions = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM emotion;`;
        dbPool.query(query, (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
        });
    });

}

const getContextType = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM context_type;`;
        dbPool.query(query, (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
        });
    });

}

const getPageCount = (user, limit, search) => {
    const query = `SELECT count(DISTINCT mood_id) AS TotalCount from mood LEFT JOIN context ON context.context_id = mood.context_id LEFT JOIN context_context_type ON context.context_id = 
                       context_context_type.context_id LEFT JOIN context_type ON context_type.context_type_id = context_context_type.context_type_id WHERE user_id = ? AND (context_comment LIKE CONCAT('%',?,'%')  OR context_type_name LIKE CONCAT('%',?,'%'))`;

    return new Promise((resolve, reject) => {
        dbPool.query(query, [user.user_id, search, search], (err, result) => {
            if (err) reject(err);
            const totalMoods = result[0].TotalCount;
            const totalPages = Math.ceil(totalMoods / limit);
            resolve(totalPages);

        });
    });


}


module.exports = {
    getMoodsByUser,
    getAddMood,
    createMood,
    getContextType,
    getEmotions,
    updateMood,
    deleteMood,
    getPageCount
};