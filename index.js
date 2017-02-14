//This is still work in progress
/*
Please report any bugs to nicomwaks@gmail.com
i have added console.log on line 48
 */
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

console.log('started...')

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
// app.get('/webhook/', function (req, res) {
// 	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
// 		res.send(req.query['hub.challenge'])
// 	} else {
// 		res.send('Error, wrong token')
// 	}
// })

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
    console.log(messaging_events)
	for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {            
			let text = event.message.text
            console.log('message')
            console.log(text)
            
			if (text.toLowerCase() === 'generic') {
				generic(sender)
				continue
			}

            if (text.toLowerCase() === 'quick reply') {
				quickReply(sender)
				continue
			}
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
            console.log('postback!')
            console.log(text)
            console.log(text.payload)
			text(sender, text, token)
			continue
		}
	}
	res.sendStatus(200)
})

// recommended to inject access tokens as environmental variables, e.g.
const token = process.env.FB_PAGE_ACCESS_TOKEN

function text(sender, text, token) {
	let messageData = { text:text }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function quickReply(sender){
    let message = {
        "text":"Hi. What can I help you with today - is your question about a (recent) bill?",
        "quick_replies":[{
            "content_type":"text",
            "title":"Yes",
            "payload":"YesBILL"
        },
        {
            "content_type":"text",
            "title":"No",
            "payload":"NoBILL"
        }]
    }
    request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: message,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function button(sender) {
    let messageData = {        
        "attachment": {
        "type":"template",
        "payload":{
            "template_type":"button",
            "text":"Hi. What can I help you with today - is your question about a (recent) bill?",
            "buttons":[{
                "type":"postback",
                "title":"Yes",
                "payload":{ // Was it different?
                    "template_type":"button",
                    "text": "Was the amount different to what you expected to pay?",
                    "buttons":[{
                        "type":"postback",
                        "title": "Yes",
                        "payload":{
                            "template_type":"button",
                            "text":"Was your bill higher or lower than you expected?",
                            "buttons":[{
                                "type":"postback",
                                "title":"Higher",
                                "payload":{
                                    "type":"postback",
                                    "title": "It could be that you've changed tariff\n" + 
                                    "Or it's possible that your account has been updated by a rading & this is not yet reflected\n" +
                                    "Which of these do you think is most likely?",
                                    "buttons":[{
                                        "type":"postback",
                                        "title":"Tariff"
                                    },{
                                        "type":"postback",
                                        "title":"Meter reading"
                                    }]
                                }
                            },{
                                "type":"postback",
                                "title":"Lower",
                                "payload":{
                                    "template_type":"button",
                                    "text":"Oh well"
                                }
                            }]
                            }
                        },
                        {
                            "type":"postback",
                            "title": "Yes",
                            "payload":{
                                "template_type":"button",
                                "text":"Was your bill higher or lower than you expected?"
                            }
                        }]
                }
            },
            {
                "type":"postback",
                "title":"No",
                "payload": {
                    "template_type": "button",
                    "text": "Ok that's nice"
                }
            }]
        }
    }
    }
    request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	    }, function(error, response, body) {
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            }
	})
}

function generic(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"subtitle": "Hi. What can I help you with today – is your question about a (recent) bill?",					
					"buttons": [{
						"type": "postback",
						"title": "Yes",
						"payload": "isBill-YES",
					},{
						"type": "postback",
						"title": "No",
						"payload": "isBill-NO",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})