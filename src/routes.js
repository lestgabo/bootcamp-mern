const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/status', (req, res) => {
    res.send({ status: 200 });
});

// TODO: Subsriber Controller -> user creates a request to the event, event owner receives request to approve or reject

// TODO: Registration controller
// TODO: get a Registration by ID - RegistrationController
// TODO: Registation Approval Controller
// TODO: Registration Rejection Controller

// Registration
routes.post('/registration/:eventId', RegistrationController.create);
routes.get('/registration/:registrationId', RegistrationController.getRegistrationById);

// Login
routes.post('/login', LoginController.store);

// Dashboard
routes.get('/dashboard', DashboardController.getAllEvents);
routes.get('/dashboard/:sport', DashboardController.getAllEvents);

// Event
routes.get('/event/:eventId', EventController.getEventById);
routes.post('/event', upload.single('thumbnail'), EventController.createEvent);
routes.delete('/event/:eventId', EventController.delete);

// User
routes.get('/user/:userId', UserController.getUserById);
routes.get('/users', UserController.getUsers);
routes.post('/user/register', UserController.createUser);

module.exports = routes;
