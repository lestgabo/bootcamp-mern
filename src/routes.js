const express = require('express');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/status', (req, res) => {
    res.send({ status: 200 });
});

// Event
routes.get('/events', EventController.getAllEvents);
routes.get('/event/:eventId', EventController.getEventById);
routes.get('/events/:sport', EventController.getAllEvents);
routes.post('/event', upload.single('thumbnail'), EventController.createEvent);
routes.delete('/event/:eventId', EventController.delete);

// User
routes.get('/user/:userId', UserController.getUserById);
routes.post('/user/register', UserController.createUser);

module.exports = routes;
