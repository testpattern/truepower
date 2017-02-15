'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

class Welcome {
    respond(sender, token){
        let messageData = {        
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Hi. What can I help you with today - is your question about a (recent) bill?",
                "buttons":[{
                    "type":"postback",
                    "title":"Yes",
                    "payload":"PaymentDifference-aboutBillYes"
                },
                {
                    "type":"postback",
                    "title":"No",
                    "payload": "PaymentDifference-aboutBillNo"
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
}

module.exports = Welcome;