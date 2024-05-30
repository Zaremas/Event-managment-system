const express = require('express');
const router = express.Router();
const EventService = require('../services/eventService')
const UserService = require('../services/userService')


router.get('/:id', async(req, res) => {
    const event = await EventService.getEventById(req.params.id);
    if (event) {
        res.render('event_details', { event });
    } else {
        res.status(404).send('Event not found');
    }
});

router.post('/:id/register', async(req, res) => {
    if (!req.user){
        return res.redirect('/auth/login')
    }
    const eventId = req.params.id;
    await UserService.registerForEvent(req.user.userId, eventId);
    res.redirect(`/events/${eventId}`);
});

module.exports = router;
