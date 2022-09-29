require('dotenv').config()

const express = require('express')
const app = express()
const url = process.env.url
const methodOverride = require('method-override')
//passport
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')

// passport config
require('./config/passport')(passport)

const mongoose = require('mongoose')

mongoose.connect(process.env.url, { useNewUrlParser: true,useUnifiedTopology: true, dbName: 'remindProject' })
const db = mongoose.connection
db.on('error', err => { console.error('connection error:', err) })
db.once('open', _ => { console.log('Database connected') })

// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
// sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
// passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// route to reminders
const mainRouter = require('./routes/mainRoutes')
const reminderRouter = require('./routes/reminders')
// /reminders or /
app.use('/', mainRouter)
app.use('/:id', reminderRouter)

app.listen(process.env.PORT, () => { console.log("listening") })
