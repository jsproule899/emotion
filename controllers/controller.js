
const getHome = (req, res) => {
    const user = req.user;
    res.status(200);
    res.render('home.ejs', {user} )

}

const get404 = (req, res) => {
    res.status(404);
    res.render('404');
}

module.exports= {
    getHome,
    get404
}