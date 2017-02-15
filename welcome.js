'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

class Welcome {

    respond(sender, token){
        var message = {
            "setting_type":"greeting",
            "greeting":{
                "text":"Hi {{user_first_name}}. What can I help you with today."
            }
        }
        request({
            url: "https://graph.facebook.com/v2.6/me/thread_settings",
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

    /*respond(sender, token){
        let messageData = {        
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"Hi. What can I help you with today?",
                    "buttons":[{
                        "type":"postback",
                        "title":"Yes",
                        "payload":"Billing-unexpected"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload": "MeterReading-welcome"
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
    }*/
}

module.exports = Welcome;