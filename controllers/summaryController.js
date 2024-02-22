const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3002'


const getTrends = async (req, res) => {
    if (!req.user) return res.redirect('auth/login')
    const user = req.user;
    var lineData = new Map();
    var todaysMoodData = [];
    var weekMoodData = [];

    //Average Mood Today Chart///////////////////////////
    const todayChart = await axios.get('/moods/date', {
        params: {
            user_id: user.user_id,
            startDate: new Date().toISOString().substring(0, 10)
        }
    }).then(response => {
        const moods = response.data.result;
        const todaysMood = [];
        moods.map((mood) => {
            mood.emotion.map((emotion, index) => {
                if (!todaysMood[index]) todaysMood[index] = []
                todaysMood[index].push(emotion.emotion_level)
            })
        });


        todaysMood.map((emotion) => {

            let total = 0;
            emotion.forEach((level) => {
                total += level;
            })

            var average = (total / emotion.length);

            todaysMoodData.push(Math.round(average));

        })
    })
    .catch(err => {
        if (err.response) {
            todaysMoodData=[]
        } else {
            console.log(err)
        }
    })

    //week Chart//////////////////////////
    const date = new Date();
    const dateMinusWeek = new Date();
    dateMinusWeek.setDate(dateMinusWeek.getDate() - 7)
    const weekChart = await axios.get('/moods/date', {

        params: {
            user_id: user.user_id,
            startDate: dateMinusWeek.toISOString().substring(0, 10),
            endDate: date.toISOString().substring(0, 10)
        }
    }).then(response => {
        const moods = response.data.result;
        const weekMoods = new Array(7);

        moods.map((mood) => {
            const moodDate = new Date(mood.mood_timestamp)
            var dayOfWeek = moodDate.getDay()
            if (!weekMoods[dayOfWeek]) weekMoods[dayOfWeek] = []
            weekMoods[dayOfWeek].push(mood);
        });
        weekMoods.map((day, dayIndex) => {
            day.map((mood) => {
                const todaysMood = [];
                mood.emotion.map((emotion, index) => {
                    if (!todaysMood[index]) todaysMood[index] = []
                    todaysMood[index].push(emotion.emotion_level)
                });
                todaysMood.map((emotion) => {
                    let total = 0;
                    emotion.forEach((level) => {
                        total += level;
                    })
                    var average = (total / emotion.length);
                    if (!weekMoodData[dayIndex]) weekMoodData[dayIndex] = []
                    weekMoodData[dayIndex].push(Math.round(average));
                });
            });
        });


    })
    .catch(err => {
        if (err.response) {
            weekMoodData= [];
        } else {
            console.log(err)
        }
    })

    //line Chart///////////////////////////////
    const lineChart = await axios.get('/moods/date', {
        params: {
            user_id: user.user_id,
        }
    }).then(response => {
        const moods = response.data.result;

        moods.map((mood) => {
            const levels = []
            moodDate = new Date(mood.mood_timestamp).toISOString()
            mood.emotion.map((emotion) => {
                levels.push(emotion.emotion_level)
            })
            lineData.set(moodDate, levels)
        });

        lineData = new Map([...lineData.entries()].sort())


    })
    .catch(err => {
        if (err.response) {
           lineData = []
        } else {
            console.log(err)
        }
    })

    Promise.all([todayChart, weekChart, lineChart])
        .then(() => {

            res.render('trends.ejs', { user, lineData, todaysMoodData, weekMoodData })
        }).catch((err) => {
            if (err.response) {

                if (!lineData) lineData = [];
                if (!todaysMoodData) todaysMoodData = [];
                if (!weekMoodData) weekMoodData = [];
                res.render('trends.ejs', { user, lineData, todaysMoodData, weekMoodData })



            } else {
                console.log(err)
            }
        })









}


module.exports = {
    getTrends,

}