const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3002'

const getMoodsByUser = async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const user = req.user;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let sort = req.query.sort || 'desc';
    let search = req.query.search || '';


    const contextType = await axios.get('/context-type')
        .then(response => { return response.data.result })

    const totalPages = await axios.get('/page-count', {
        params: {
            user_id: user.user_id,
            limit: limit,
            search: search
        }
    }).then(response => { return response.data.result })

    await axios.get('/moods', {
        params: {
            user_id: user.user_id,
            page: page,
            sort: sort,
            limit: limit,
            search: search
        }
    }).then(response => {
        const moods = response.data.result;
        res.render('viewMoods',
            { moods, user, totalPages, contextType })
    }).catch(err => {
        if (err.response.status == 500) {
            res.render('viewMoods',
                { moods: null, user, totalPages: 1, errMessage: err.response.statusText, contextType });
        } else if (err.response.status == 404) {
            res.render('viewMoods', { moods: null, user, totalPages: 1, contextType });
        }
    })


}

const getAddMood = async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const user = req.user;

    const contextType = await axios.get('/context-type')
        .then(response => { return response.data.result })
        .catch(err => {
            res.render('addMood', { errMessage: "Error cannot add Moods at this moment, please try again later..." });
            console.log(err)

        });
    const emotions = await axios.get('/emotions')
        .then(response => { return response.data.result; })
        .catch(err => {
            res.render('addMood', { errMessage: "Error cannot add Moods at this moment, please try again later..." });
            console.log(err)
        });

    Promise.all([contextType, emotions]).then(
        res.render('addMood', { emotions, contextType, user })
    )


}

const createMood = (req, res) => {

    req.body.user_id = req.user.user_id

    axios.post(`/moods/`, req.body)
        .then(response => { res.redirect('/mood/view') })
        .catch(err => {
            res.render('addMoods', { errMessage: "Error Mood could not be added, please try again..." })
        })

}

const updateMood = (req, res) => {

    const { id } = req.params;

    axios.put(`/moods/${id}`, req.body)
        .then(response => { res.redirect('/mood/view') })
        .catch(err => {
            res.render('viewMoods', { errMessage: "Error Mood could not be edited, please try again..." })
        })
}

const deleteMood = (req, res) => {
    const { id } = req.params;
    axios.delete(`/moods/${id}`)
        .then(response => { res.redirect('/mood/view') })
        .catch(err => {
            res.render('viewMoods', { errMessage: "Error Mood could not be deleted, please try again..." })
        })
}




module.exports = {
    getMoodsByUser,
    getAddMood,
    createMood,
    updateMood,
    deleteMood,

};