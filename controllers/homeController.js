
const getHome = (req, res) => {
    const user = req.user;
    res.status(200);
    res.render('home.ejs', {user} )

}

module.exports= {
    getHome
}