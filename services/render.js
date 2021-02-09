const axios = require('axios');

exports.homeRoutes = (req, res) => {
    //make a GET request to /api/appointments
    axios.get('http://localhost:80/api/appointments')
        .then(function(response){
            res.render('index', {appointments: response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_appointment = (req, res) => {
    res.render('add_appointment');
}