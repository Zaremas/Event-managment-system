const express = require('express');
const router = express.Router();
const EventService = require('../services/eventService')
const UserService = require('../services/userService')


router.get('/',async (req, res) => {
    const events = await EventService.getAllEvents()
    res.render('index', { events });
});
router.get('/create', (req, res) => {
    res.render('create_event');
});
router.post('/create', async(req, res) => {
    try {
        const { name, description, date, place, spotsOverall } = req.body;
        await EventService.createEvent(name, description, date, place, spotsOverall)
        res.redirect('/');
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
});
router.get('/my-events', async (req, res) => {
    if (!req.user){
        return res.redirect('/auth/login')
    }
    try {
      const events = await UserService.getRegisteredEvents(req.user.email);
      res.render('my_events.ejs', { events });
    } catch (error) {
      res.status(500).send('Error fetching events');
    }
  });

module.exports = router;
