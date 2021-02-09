const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');

//set up express app
const app = express();

//enabling all CORS requests
app.use(cors());

//connect to mongoDB
mongoose.connect('mongodb+srv://admin:admin123@cluster0.dbeuq.mongodb.net/appointments?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// attach data to request via body-parser, returning json
app.use(bodyParser.json());

//set view engine, as below or "app.set("views", path.resolve(__dirname, "views/ejs"));""
app.set("view engine", "ejs");

//load assets (ex.: 'css/style.css')
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));

//using the routes specified in routes/api.js, first through 'api', then passing the route proper in the second parameter
app.use('/api', routes);

//error handling middleware, the 'next' parameter on our api method routes
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port || 80, function(){
    console.log('now listening for requests...');
});