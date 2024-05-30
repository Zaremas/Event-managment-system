const User = require('../models/User');
const bcrypt = require('bcrypt')
const EventService = require('../services/eventService');


class UserService {
  async createUser(email, password, firstName, lastName,role) {
    try {
      const user = new User({
        email,
        password,
        firstName,
        lastName,
        role
      });
      await user.save();
      return user;
    } catch (error) {
        console.error(error);
      throw new Error('Error creating user');
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }
  async registerForEvent(userId, eventId) {
    try {
        const user = await User.findById(userId);
        console.log(user,userId,eventId);
        if (!user.bookedEvents.includes(eventId)) {
            user.bookedEvents.push(eventId);
            await user.save();
            await EventService.register(eventId);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error registering for event');
    }
  }
  async getRegisteredEvents(email) {
    try {
        const user= await User.findOne({email})
        console.log(user);
        const userEventsIDs = user.bookedEvents
        const userEvents = []
        for(let eventId of userEventsIDs){
            const event = await EventService.getEventById(eventId);
            userEvents.push(event)
        }
        console.log(userEvents);
        return userEvents
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching registered events');
    }
  }

  async comparePassword(email, candidatePassword) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        return isMatch;
    } catch (error) {
        console.error(error);
        throw new Error('Error comparing passwords');
    }
  }
}

module.exports = new UserService();
