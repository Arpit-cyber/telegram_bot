const express = require('express')
const tc = require('telegraf')
const token = '968970161:AAFbQbjxL6TCLCXQtVbSBrOjr3NlwpWb7cE'
const mysql = require('mysql')
const app = express()
const bot = new tc(token)

var x = 0;
var name;
var college;
var sideproject;
var language;
var frameworks;
var projects;
var confidence;
var git;

//Database Connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bot"
})
//Checking Connection
conn.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected !")
})

bot.start((ctx) => {
    ctx.reply("What is your name?")
})

bot.on('message', (ctx) => {
    if (x == 0) {
        name = ctx.message.text
        ctx.reply("Which college are you from?")
        x++
    }
    else if (x == 1) {
        college = ctx.message.text
        ctx.reply("How did you get to know about SideProjects?")
        x++
    }
    else if (x == 2) {
        sideproject = ctx.message.text
        ctx.reply("Which programming languages do you know? Enter them all by seperating them with comma(,).")
        x++
    }
    else if (x == 3) {
        language = ctx.message.text
        ctx.reply("Do you know any frameworks? Enter them all by seperating them with comma(,).")
        x++
    }
    else if (x == 4) {
        frameworks = ctx.message.text
        ctx.reply("Have you previously done any projects? (Yes or No)")
        x++
    }
    else if (x == 5) {
        projects = ctx.message.text
        ctx.telegram.sendMessage(ctx.chat.id, 'How confident are you about your programming skills?',
        {
            reply_markup: {
              inline_keyboard: [
                    [{text: 'Confident', callback_data: 'con'},{text: 'Confident Enough', callback_data: 'cone'}],
                    [{text: 'Learner', callback_data: 'Le'}],
                ]  
            } 
        })
        x++
    }
    else if (x == 7) {
        git = ctx.message.text
        ctx.reply("You answer all the question")
        x = 0

        var sql = "INSERT into answer values(null, '"+ name +"', '"+ college +"', '"+ sideproject +"', '"+ language +"', '"+ frameworks +"', '"+ projects +"', '"+ confidence +"', '"+ git +"')"
        conn.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("1 entry successful")
            }
        })
    }
})

bot.action('con', (ctx) => {
    confidence = "Confident"
    ctx.reply("Please share your github repository for us to keep a track of your work.")
    x++
})

bot.action('cone', (ctx) => {
    confidence = "Confident Enough"
    ctx.reply("Please share your github repository for us to keep a track of your work.")
    x++
})

bot.action('Le', (ctx) => {
    confidence = "Learner"
    ctx.reply("Please share your github repository for us to keep a track of your work.")
    x++
})

app.listen(3000,() => { console.log("App Starts at port 3000")})

bot.launch()