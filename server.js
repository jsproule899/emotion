require('dotenv').config({path:'./.env'});
const app = require('./app')


app.listen(process.env.PORT, (err) => {
    if (err)
        return console.log(err);
    console.log(`Express Server running at http://localhost:${process.env.PORT}`);
});