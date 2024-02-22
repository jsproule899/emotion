
const getHome = (req, res) => {
    const user = req.user;
    res.status(200);
    res.render('home.ejs', {user} )

}

const get404 = (req, res) => {
    const user = req.user;
    res.status(404);
    res.render('404',{user});
}

module.exports= {
    getHome,
    get404
}