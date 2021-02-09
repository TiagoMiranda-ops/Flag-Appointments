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

exports.update_appointment = (req, res) => {
    axios.get('http://localhost:80/api/appointments',{params: {id: req.query.id}})
    .then(function(appointment){
        res.render("update_appointment", {appointment: appointment.data})
    })
    .catch(err=>{
        res.send(err);
    })
}