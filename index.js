const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//const flash = require('express-flash');
//const session = require('express-session');
const waiter = require("./waiter-webapp");
const routes = require('./routes');

const app = express();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts',
});

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

//which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/waiter_app';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
// }));
// app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())


const waiterInsta = waiter(pool);
//const Routes = routes(waiterInsta);

// Welcome page
app.get('/', async function (req, res) {
    res.render('login')
});

app.post('/loginBtn', async function (req, res) {
    try {
        var userId = req.body.inputBox;
        //console.log(userId);
        await waiterInsta.login(userId);
        res.redirect(`waiter/${userId}`)
    } catch (err) {
        console.log(err)
    }
});

app.get('/waiter/:username', async function (req, res) {
    var user = req.params.username;
    res.render('waiter', {
        user
    })
});

app.post('/submitBtn/:username', async function (req, res) {
    try {
    var user = req.params.username;
    //console.log(user);
    var stuffWorkDays = req.body.days;
//console.log(stuffWorkDays)
    //console.log(await waiterInsta.data(user, stuffWorkDays))
    
    // await waiterInsta.data(user, stuffWorkDays);

    await waiterInsta.data(user,stuffWorkDays);
    // console.log(jab)

    res.redirect(`/waiter/${user}`)


} catch (err) {
    console.log(err)
}
});

// app.post('/resetButton', Routes.reset);


let PORT = process.env.PORT || 2017;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});