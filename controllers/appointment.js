const Appointment = require('../models/appointment');

exports.create = (req, res, next) => {

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

};


exports.findById = (req, res, next) => {

    Appointment.findById({_id: req.params.id})
        .then( function(oneAppointment){
            res.send(oneAppointment);
        }).catch(next);
};


exports.find = (req, res, next) => {

    Appointment.find({})
        .then( function(allAppointments){
        res.send(allAppointments);
    }).catch(next);
};


exports.update = (req, res, next) => {

    Appointment.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then( function(){
        Appointment.findOne({_id: req.params.id})
        .then( function(updatedAppointment){
        res.send(updatedAppointment);
        }).catch(next);     
    });
};


exports.delete = (req, res, next) => {

    Appointment.findByIdAndRemove({_id: req.params.id})
        .then(function(removedAppointment){
        res.send(removedAppointment);
    }).catch(next);
};