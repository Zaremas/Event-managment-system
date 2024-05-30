const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index');
const eventsRouter = require('./routes/events');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose')
const {isAuthenticated} = require('./middlewares/authenticate')
const config = require('./config')


async function connectToMongoose() {
    return mongoose.connect(config.mongodb.url);
  }
  
connectToMongoose()
.then(() => {
    console.info("connected to mongodb");
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(isAuthenticated);

    app.use('/', indexRouter);
    app.use('/events', eventsRouter);
    app.use('/auth', authRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

})
.catch((err) => {
    console.error(err);
});
 