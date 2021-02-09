const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');


//get all appointments from the db
router.get('/appointments', function(req, res, next){

    Appointment.find({})
        .then( function(allAppointments){
        res.send(allAppointments);
    }).catch(next);
});

//get one appointment from the db through the id

router.get('/appointments/:id', function (req, res, next) {

    Appointment.findById({_id: req.params.id})
        .then( function(oneAppointment){
            res.send(oneAppointment);
        }).catch(next);
});

//add a new appointment to the db
router.post('/appointments', function(req, res, next){

    Appointment.exists({ date: req.body.date }, function(err) {
        if (err) {
          res.status(409).send(`Error: the date ${req.body.date} is already booked, choose another!`);
        } else {
          Appointment.create(req.body)
          .then(function (appointmentData){
              res.send(appointmentData);
          }).catch((err) =>{
            res.status(409).send(`Error: the date ${req.body.date} is already booked, choose another!`);
          });
        }
      });

});








  /*var dateExists = Appointment.findOne({date: req.body.date})

    if(dateExists){
        return res.status(409).send(`Error: the date ${req.body.date} is already booked, choose another!`)
    }else{

    Appointment.create(req.body)
        .then( function(appointmentData){
        res.send(appointmentData);
    }).catch(next);
    }
    */


















//update an appointment in the db
router.put('/appointments/:id', function(req, res, next){

    Appointment.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then( function(){
        Appointment.findOne({_id: req.params.id})
        .then( function(updatedAppointment){
        res.send(updatedAppointment);
        }).catch(next);     
    });
});

//delete an appointment from the db
router.delete('/appointments/:id', function(req, res, next){

    Appointment.findByIdAndRemove({_id: req.params.id})
        .then(function(removedAppointment){
        res.send(removedAppointment);
    }).catch(next);
});

module.exports = router;