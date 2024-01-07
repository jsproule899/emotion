const { connection } = require('../dbService')
const Mood = require('../models/Mood.js');
require('dotenv').config();


class moodController {


    async getAllMoods() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM mood JOIN mood_emotion ON mood.mood_id=mood_emotion.mood_id 
                                JOIN emotion ON emotion.emotion_id=mood_emotion.emotion_id
                                JOIN context ON context.context_id=mood.context_id
                                JOIN context_context_type ON context.context_id = context_context_type.context_id 
                                JOIN context_type ON context_type.context_type_id= context_context_type.context_type_id `

                connection.query(query, (err, result) => {
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

    async getMoodsByUser(user) {

        try {
            var moodQuery = `SELECT * FROM mood JOIN context ON context.context_id = mood.context_id WHERE user_id = ?`

            var emotionQuery = `SELECT emotion_name, emotion_level, emotion_colour, emotion_icon FROM mood JOIN mood_emotion ON mood.mood_id = mood_emotion.mood_id 
                            JOIN emotion ON emotion.emotion_id = mood_emotion.emotion_id 
                            WHERE user_id = ? and mood.mood_id = ?`

            var contextQuery = `SELECT context_type_name, context_icon FROM mood JOIN context ON context.context_id = mood.context_id 
                            JOIN context_context_type ON context.context_id = context_context_type.context_id
                            JOIN context_type ON context_type.context_type_id = context_context_type.context_type_id 
                            WHERE user_id = ? and mood.mood_id = ? `


            const moodResult =
                await new Promise((resolve, reject) => {
                    connection.query(moodQuery, [user.user_id], (err, result) => {
                        if (err) reject(err);
                        result.forEach(async (mood) => {

                            mood.emotion = await new Promise((resolve, reject) => {
                                connection.query(emotionQuery, [user.user_id, mood.mood_id], (err, result) => {
                                    if (err) reject(err);
                                    resolve(result);
                                });
                            });

                            mood.context = await new Promise((resolve, reject) => {
                                connection.query(contextQuery, [user.user_id, mood.mood_id], (err, result) => {
                                    if (err) reject(err);
                                    resolve(result);
                                });
                            });

                            resolve(result);
                        });
                    });
                });

            return moodResult;
        } catch (error) {
            console.log(error);
        }

    }


    async createMood(user, req) {
        const { enjoyment, sadness, anger, contempt, disgust, fear, surprise, Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping, comment } = req.body;
        const newMood = Mood.getMoodInstance(user.user_id, comment, enjoyment, sadness, anger, contempt, disgust, fear, surprise, Romance, Family, Work, Holiday, Lonely, Exercise, Friends, Shopping);

        try {
            await new Promise((resolve, reject) => {

                const query1 = `INSERT INTO context (context_id, context_comment, context_timestamp) VALUES (null, ?, current_timestamp());`
                const query2 = `SET @last_context_id = LAST_INSERT_ID();`
                const query3 = `INSERT INTO context_context_type (context_context_type_id,context_id, context_type_id) VALUES (null, @last_context_id,?);`
                const query4 = `INSERT INTO mood (mood_id, mood_timestamp, date_added, time_added, user_id, context_id) VALUES (null, current_timestamp(), CURRENT_DATE(), CURRENT_TIME, ?, @last_context_id );`
                const query5 = `SET @last_mood_id = LAST_INSERT_ID();`
                const query6 = `INSERT INTO mood_emotion (mood_emotion_id, emotion_level, mood_id, emotion_id) VALUES (null, ?, @last_mood_id, ?);`

                connection.beginTransaction((err) => {
                    if (err) reject(err);
                    connection.query(query1, [newMood.context_comment], (err, result) => {
                        if (err) return connection.rollback(reject(err));
                        connection.query(query2, (err, result) => {
                            if (err) return connection.rollback(reject(err));

                            for (let context in newMood.context) {
                                if (newMood.context[context]) {
                                    var contextType;
                                    console.log(context)
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
                                        if (err) return connection.rollback(reject(err));

                                    });
                                }
                            }
                            connection.query(query4, [newMood.user_id], (err, result) => {
                                if (err) return connection.rollback(reject(err));
                                connection.query(query5, [newMood.user_id], (err, result) => {
                                    if (err) return connection.rollback(reject(err));
                                    connection.query(query6, [newMood.emotion.enjoyment, 1], (err, result) => {
                                        if (err) return connection.rollback(reject(err));
                                        connection.query(query6, [newMood.emotion.sadness, 2], (err, result) => {
                                            if (err) return connection.rollback(reject(err));
                                            connection.query(query6, [newMood.emotion.anger, 3], (err, result) => {
                                                if (err) return connection.rollback(reject(err));
                                                connection.query(query6, [newMood.emotion.contempt, 4], (err, result) => {
                                                    if (err) return connection.rollback(reject(err));
                                                    connection.query(query6, [newMood.emotion.disgust, 5], (err, result) => {
                                                        if (err) return connection.rollback(reject(err));
                                                        connection.query(query6, [newMood.emotion.fear, 6], (err, result) => {
                                                            if (err) return connection.rollback(reject(err));
                                                            connection.query(query6, [newMood.emotion.surprise, 7], (err, result) => {
                                                                if (err) return connection.rollback(reject(err));
                                                                connection.commit((err) => {
                                                                    if (err) return connection.rollback(reject(err));
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

        } catch (error) {
            console.log(error);
        }

    }


    async updateMood(id, req) {
        const {contextComment} = req.body;
        
    }

    async deleteMood(id) {

        await new Promise((resolve, reject) => {

            const query1 = `SET @moodId = ?;`
            const query2 = `SELECT @contextId := context_id FROM mood WHERE mood_id = @moodId;`
            const query3 = `DELETE FROM context_context_type WHERE context_id = @contextId;`
            const query4 = `DELETE FROM mood_emotion WHERE mood_id= @moodId;`
            const query5 = `DELETE FROM mood WHERE mood_id = @moodId;`
            const query6 = `DELETE FROM context WHERE context_id = @contextId;`



            connection.beginTransaction((err) => {

                if (err) reject(err);
                connection.query(query1, [+id], (err, result) => {
                    if (err) return connection.rollback(reject(err));
                    connection.query(query2, (err, result) => {
                        if (err) return connection.rollback(reject(err));
                        connection.query(query3, (err, result) => {
                            if (err) return connection.rollback(reject(err));
                            connection.query(query4, (err, result) => {
                                if (err) return connection.rollback(reject(err));
                                connection.query(query5, (err, result) => {
                                    if (err) return connection.rollback(reject(err));
                                    connection.query(query6, (err, result) => {
                                        if (err) return connection.rollback(reject(err));
                                        connection.commit((err) => {
                                            if (err) return connection.rollback(reject(err));
                                            resolve(console.log("Mood with ID: " + id + " successfully removed!"));
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
}
module.exports = moodController;