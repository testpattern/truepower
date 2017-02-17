'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const fs = require('fs')
const http = require('http')
const url = require('url')

let Responder = require('./responder');
let responder = new Responder();
let Tests = require('./tests/tests.js');
//let tests = new Tests(true);
// read a config value to control whether to run tests
// and maybe define which tests to run by name
// recommended to inject access tokens as environmental variables, e.g.
const token = process.env.FB_PAGE_ACCESS_TOKEN;

app.set('port', (process.env.PORT || 5000))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
// serve /assets directory
app.use('/assets', express.static(__dirname + '/assets'));

console.log('started...')
// serve root path
app.get('/', function (req, res) {
	res.send('True Power Bot is alive')
})

// for facebook verification
// app.get('/webhook/', function (req, res) {
// 	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
// 		res.send(req.query['hub.challenge'])
// 	} else {
// 		res.send('Error, wrong token')
// 	}
// })

// react to /webhook/ call
app.post('/webhook/', function (req, res) {
    console.log('webhook!')
	let messaging_events = req.body.entry[0].messaging
    
	for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {            
			let text = event.message.text.toLowerCase();
            			
            if (text === 'quick reply') {
				responder.respond(sender, token, "Welcome.QuickReply");
				continue
			}

            if (text === "hi" || text === "hello") {
                // wrap all interactions?
                responder.getUserFirstname(sender, token, function(firstname) {
                    var intro = { "text" : `Hi ${firstname}. What can I help you with today?` };
                    responder.sendMessage(sender, token, intro);
                    setTimeout(function() {
                        responder.respond(sender, token, "Welcome.Intro");
                    }, 1750);
                });
            }

            if (text === 'welcome' || text === "demo") {
			    responder.respond(sender, token, "Welcome.Intro")
				continue
			}
		}
		if (event.postback) {
            console.log('postback!')
            console.log(event.postback.payload)
            responder.respond(sender, token, event.postback.payload)
			continue
		}
        if (event.message.quick_reply) {
            console.log('quick reply!');
            responder.respond(sender, token, event.message.quick_reply.payload)
        }
	}
	res.sendStatus(200)
})

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})