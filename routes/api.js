const express = require('express');
const router = express.Router();

const services = require('../services/render');
const controller = require('../controllers/appointment');


router.get('/', services.homeRoutes);

router.get('/add-appointment', services.add_appointment);

router.get('/update-appointment', services.update_appointment);

//API

router.post('/api/appointments', controller.create);
router.get('/api/appointments/:id', controller.findById);
router.get('/api/appointments', controller.find);
router.put('/api/appointments/:id', controller.update);
router.delete('/api/appointments/:id', controller.delete);



module.exports = router;