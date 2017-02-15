'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

let Welcome = require('./welcome');
let PaymentDifference = require('./paymentDifference');

class Responder {

    constructor() {
        // todo: add all the responders
        let welcome = new Welcome();
        let paymentDifference = new PaymentDifference();
        this.responders = [
            {name: "Welcome", value: welcome},
            {name: "PaymentDifference", value: paymentDifference}
        ];
    }

    find(name){
        var result = this.responders.find(function(item) {
            return item.name === name;
        });
        return result;
    }

    respond(name, selection) {
        return this.find(name).value.respond(selection);
    }

    welcome(sender, token) {
        return this.find("Welcome").value.respond(sender, token);
    }

    nextResponse(sender, text, token) {
        // this will construct the response based on the postback text
        // something like an array of functions and each one contructs its own message
        var name = text.split('-')[0];
        var selection = text.split('-')[1];
        let message = this.respond(name, selection);
        
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token:token },
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

    quickReply(sender, token){
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

    generic(sender,token) {
        let messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Hi. What can I help you with today – is your question about a (recent) bill?",
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
}

module.exports = Responder;