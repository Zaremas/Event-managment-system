const Event = require('../models/Event');

class EventService {
  async createEvent(name, description, date,place, spotsOverall) {
    try {
      const event = new Event({
        name,
        description,
        date,
        place,
        spotsAvailable:spotsOverall,
        spotsOverall
      });
      await event.save();
      return event;
    } catch (error) {
      console.error(error)
      throw new Error('Error creating event');
    }
  }

  async getEventById(id) {
    try {
        console.log(id);
      const event = await Event.findById(id);
      console.log(event);
      return event;
    } catch (error) {
      throw new Error('Error fetching event');
    }
  }

  async getAllEvents() {
    try {
        const events = await Event.find().sort({ date: 'asc' });
        return events;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching events');
    }
  }
  async register(id) {
    try {
        const event = await Event.findById(id);
        if (event.spotsAvailable>0){
            event.spotsAvailable -=1;
            await event.save()
        }

    } catch (error) {
        throw new Error('Error registering to an event');
    }
  }
}

module.exports = new EventService();
