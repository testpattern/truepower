'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var Responder = require('./responder');
var responder = new Responder();
// recommended to inject access tokens as environmental variables, e.g.
const token = process.env.FB_PAGE_ACCESS_TOKEN;
var firstname = "user";
app.set('port', (process.env.PORT || 5000))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
console.log('started...')
// index
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
function testResponders() {
    var payload = "Welcome.Intro";    
    let message = responder.respond(null, null, payload);
    console.log(message);
}
//testResponders();
function testText(text){
    var data = "{ sender: { id: '1235693409813391' },"+
               "2017-02-14T11:12:51.636367+00:00 app[web.1]:     recipient: { id: '371501613224785' },"+
               "2017-02-14T11:12:51.636368+00:00 app[web.1]:     timestamp: 1487070771080,"+
               "2017-02-14T11:12:51.636369+00:00 app[web.1]:     message: { mid: 'mid.1487070771080:2e60d9d730', seq: 423, text: 'button' } }";
    var port = app.get('port');
    // todo: add body to post
    var req = request("localhost:" + port + "/webhook/", function(response){
      // todo: construct a mock message object
    })
}
// to post data
app.post('/webhook/', function (req, res) {
    console.log('webhook!')
	let messaging_events = req.body.entry[0].messaging
    
	for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {            
			let text = event.message.text.toLowerCase()            
			if (text === 'generic') {
				responder.generic(sender, token)
				continue
			}
            
            if (text === 'quick reply') {
				responder.quickReply(sender, token)
				continue
			}

            if (text === "hi" || text === "hello") {
                // wrap all interactions?
                request({
                    url: "https://graph.facebook.com/v2.6/" + sender + "?fields=first_name&access_token=" + token,
                    method: 'GET'
                }, function(error, response, body){
                    console.log('user name');
                    console.log(response);
                    console.log(body);
                    if (response.first_name) {
                        firstname = response.first_name;
                        var intro = "Hi " + firstname + ". What can I help you with today?";
                        responder.sendMessage(sender, token, intro);
                    }
                });
            }

            if (text === 'welcome' || text === "demo") {
			    responder.respond(sender, token, "Welcome.Intro")
				continue
			}

            if (text === "demo list") {
			    responder.respond(sender, token, "Welcome.List")
				continue
			}
		}
		if (event.postback) {
            console.log('postback!')
            console.log(event.postback.payload)
            responder.respond(sender, token, event.postback.payload)
			continue
		}
        if (event.quick_reply) {
            responder.respond(sender, token, event.quick_reply.payload)
        }
	}
	res.sendStatus(200)
})

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})