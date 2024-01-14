const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');

router.get('/view', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const user = req.user;

    res.status(200);
    
    
    const contextType = await moodController.getContextType()
    .then(contextType => { return contextType })
    .catch(err => console.log(err));


    moodController.getMoodsByUser(user)
        .then(data => {
            //console.log(data)
            res.render('viewMoods',
                { data, user, contextType});
        })
        .catch(err => {
            console.log(err)
            moodController.getContextType()
            .then(contextType => {  
                res.render('viewMoods',
                { errMessage: err.message, data, user, contextType });
            })
            .catch(err => console.log(err));
            
        });

});


router.route('/add')
    .get(async (req, res) => {
        if (!req.user) return res.redirect('/login')
        const user = req.user;
        res.status(200);
        
        const contextType = await moodController.getContextType()
            .then(contextType => { return contextType })
            .catch(err => console.log(err));

           moodController.getEmotions()
            .then(emotions => { res.render('addMood', { emotions, contextType, user }) })
            .catch(err => console.log(err));

    })
    .post(async (req, res) => {
        
        moodController.createMood(req.user, req)
        .then(setTimeout(()=>
            res.redirect('/mood/view'), 1000))
        .catch(err => {
            console.log(err)
                           
        });
    }
    );

router.route('/delete/:id')
    .post(async (req, res) => {

        const id = req.params.id;
         moodController.deleteMood(id)
            .then( setTimeout(()=>
                res.redirect('/mood/view'), 1000))
            .catch(err => {
                console.log(err)
                               
            });
    }
    )


    router.route('/update/:id')
    .post(async (req, res) => {

        const id = req.params.id;        
        moodController.updateMood(id, req.body)
            .then( setTimeout(()=>
                res.redirect('/mood/view'), 1000))
            .catch(err => {
                console.log(err)
                               
            });
    }
    )

module.exports = router;