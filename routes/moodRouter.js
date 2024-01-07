const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');


//connect db
const { dbService } = require('../dbService.js');





// router.get('/view', (req, res) => {
//     res.status(200);
//     res.render('viewMoods', moodController.getAllMoods)
// });

router.get('/view', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const user = req.user;

    res.status(200);
    const db = dbService.getDbServiceInstance();
    
    const contextType = await db.getContextType()
    .then(contextType => { return contextType })
    .catch(err => console.log(err));


    new moodController().getMoodsByUser(user)
        .then(data => {
            //console.log(data)
            res.render('viewMoods',
                { data, user, contextType});
        })
        .catch(err => {
            console.log(err)
            db.getContextType()
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
        const db = dbService.getDbServiceInstance();


        const contextType = await db.getContextType()
            .then(contextType => { return contextType })
            .catch(err => console.log(err));

        db.getEmotions()
            .then(emotions => { res.render('addMood', { emotions, contextType, user }) })
            .catch(err => console.log(err));

    })
    .post(async (req, res) => {
        
        new moodController().createMood(req.user, req)
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
        new moodController().deleteMood(id)
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
        new moodController().updateMood(id, req)
            .then( setTimeout(()=>
                res.redirect('/mood/view'), 1000))
            .catch(err => {
                console.log(err)
                               
            });
    }
    )

module.exports = router;