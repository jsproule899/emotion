const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');

router.get('/view/', async (req, res) => {

    if (!req.user) return res.redirect('/login')
    const user = req.user;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let sort = req.query.sort || 'desc';
    let search = req.query.search || '';

    try {
        res.status(200);
        const totalPages = await moodController.getPageCount(user, limit, search);
        const contextType = await moodController.getContextType();
        const moods = await moodController.getMoodsByUser(user, page, limit, sort, search);

        if (totalPages && contextType && moods) {

            res.render('viewMoods',
                { moods, user, totalPages, contextType });
        }
    } catch (err) {
        res.render('viewMoods',
            { moods: null, user, totalPages: 1, errMessage: "Cannot show Moods at this moment, please try again later..." });
        console.log(err)


    }
}

);




router.route('/add')
    .get(async (req, res) => {
        if (!req.user) return res.redirect('/login')
        const user = req.user;
        res.status(200);

        const contextType = await moodController.getContextType()
            .then(contextType => { return contextType })
            .catch(err => {
                res.redirect('/', { errMessage: "Error cannot add Moods at this moment, please try again later..." });
                console.log(err)

            });
        moodController.getEmotions()
            .then(emotions => { res.render('addMood', { emotions, contextType, user }) })
            .catch(err => {
                res.redirect('/', { errMessage: "Error cannot add Moods at this moment, please try again later..." });
                console.log(err)
            });
    })
    .post(async (req, res) => {

        moodController.createMood(req.user, req)
            .then(
                res.redirect('/mood/view'))
            .catch(err => {
                res.redirect('/mood/add', { errMessage: "Error could not add Mood, please try again..." })
                console.log(err)
            });
    }
    );

router.route('/delete/:id')
    .post(async (req, res) => {

        const id = req.params.id;
        moodController.deleteMood(id)
            .then(
                res.redirect('/mood/view'))
            .catch(err => {
                res.redirect('/mood/view', { errMessage: "Error Mood could not be deleted, please try again..." })
                console.log(err)

            });
    }
    )


router.route('/update/:id')
    .post(async (req, res) => {

        const id = req.params.id;
        moodController.updateMood(id, req.body)
            .then(
                res.redirect('/mood/view'))
            .catch(err => {
                res.redirect('/mood/view', { errMessage: "Error Mood could not be edited, please try again..." })
                console.log(err)

            });
    }
    )

module.exports = router;