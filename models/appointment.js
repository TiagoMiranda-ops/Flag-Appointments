const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create appointment Schema and model

const AppointmentSchema = new Schema({

    date:{
        type: Date,
        required: [true, 'A proposed date is required in the YYYY-MM-DD format.'],
    },
    status:{
         type: String,
         default: "Pending"
     },
    customer:{
        type: String,
        default: null
    },
    broker:{
        type: String,
        default: null
    },

});

//first parameter (collection) is pluralised in mongodb (ex.: "appointments"), second points to the model's schema created above
const Appointment = mongoose.model('appointment', AppointmentSchema);

module.exports = Appointment;