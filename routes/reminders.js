const express = require("express")
const router = express.Router()
const reminderController = require("../controller/reminder")
const { ensureAuth } = require('../middleware/auth')

// Getting /all reminders
router.get('/', ensureAuth, reminderController.getReminders)

// Getting one reminder
router.get('/:id', reminderController.getOneReminder)

// Creating reminder
router.post('/reminders', reminderController.createReminders);

// Updating reminder
router.put('/updateReminders/:id', reminderController.updateReminders)

// Show reminder
router.get('/showReminders/:id', reminderController.showReminders)

// Deleting reminder
router.delete('/deleteReminder', reminderController.deleteReminders)

module.exports = router