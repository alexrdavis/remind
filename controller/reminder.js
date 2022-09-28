const Remind = require("../models/Remind")
const Users = require("../models/Users")
const dates = require("../public/dateCalc")

module.exports = {
    getReminders: async (req, res) => {
        try {
            const reminders = await Remind.find({userId: req.user.id})
            res.render("index.ejs", {reminders: reminders, user: req.user})
        } catch (err) {
            console.log(err)
        }
    },
    createReminders: async (req, res) => {
        try {
            await Remind.create({name: req.body.name, date: req.body.date, userId: req.user.id})
            res.redirect("/all")
        } catch (err) {
            res.status(400)
        }
    },
    deleteReminders: async (req, res) => {
        try {
            await Remind.findOneAndDelete({_id:req.body.reminderIdFromJSFile})
            res.json("Deleted it")
        } catch(err) {
            console.log(err)
        }
    },
    updateReminders: async (req, res) => {
        let remind
        try {
            remind = await Remind.findById(req.params.id)
            remind.name = req.body.name
            remind.date = req.body.date
            await remind.save()
            res.redirect("/all")
        } catch (err) {
            console.log(err)
        }
    },
    getOneReminder: async (req, res) => {
        try {
            const reminder = await Remind.findById({_id: req.params.id})
            let todaysDate = new Date()
            let eventDate = reminder.date 
            let calculatedDates = dates.dateDiff(eventDate, todaysDate)
            res.render("edit.ejs", {reminder: reminder, calculated: calculatedDates})
        } catch (err) {
            console.log(err)
        }
    }
}