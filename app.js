const express = require('express');
const app = express();
const db = require('./config/detabase');
const product = require('./routes/product_routes');
const Cart = require('./routes/cart_router');
const home = require('./routes/homPage_routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// bring ejs template
app.set('view engine', 'ejs')

// bring body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//bring static
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('node_modules'))

// session and flash config .
app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}))

app.use(flash());


app.get('/', (req, res) => {
    res.redirect('/home')
})


app.use('/home', home);
app.use('/product', product);
app.use('/', Cart);


let port = 4000;
app.listen(port, () => {
    console.log('Server is Running on Port ' + port);
});