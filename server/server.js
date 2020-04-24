let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://root:root@exterminators-hvc8c.mongodb.net/bankdb?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

mongoose.Promise = global.Promise;


//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
    // res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const initApp = require('./app/app');
initApp(app);

app.listen(port);

console.log('Exterminator app API server started on: ' + port);
