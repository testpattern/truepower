'use strict'
const express = require('express')
const request = require('request')
const app = express()

class Tests {

    constructor(run) {
        this.sender = "1235693409813391";
        this.token = "EAAaXW9BqZA2IBAGQgmZBZAyEeMg5CJHNmlT9Wogej50lytdSICHtdHqqFZBldXwnXutUNZC7fHz4NIy7cOq1C5xIqL9z78A1ab2MuBrlXDEl9MvZADRHJC5U8GkOIdeNNlZBKLuThTbMGBpEcOqGXhrmvAZAsFTw6T2xjHkwg6vOZAAZDZD";        
        if (run) {
            this.quickReply();
            this.image();
            this.intro();
        }
    }

    quickReply() {
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
            qs: {access_token:this.token},
            method: 'POST',
            json: {
                recipient: {id:this.sender},
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

    image() {
        request({
            url:"http://localhost:5000/",
            method: "GET",
        }, function(error, response, body) {
            console.log(body);
        })
        request({
            url:"http://localhost:5000/assets/meter.png",
            method: "GET",
        }, function(error, response, body) {
            console.log(body);
        })
    }

    intro(){        
        request({
            url: `https://graph.facebook.com/v2.6/${this.sender}?fields=first_name&access_token=${this.token}`,
            method: 'GET'
        }, function(error, response, body){
            if (body.length) {
                let firstname = JSON.parse(body).first_name;
                let intro = { 
                    "text" : "Hi " + firstname + ". What can I help you with today? :)" 
                }
                //responder.sendMessage(this.sender, this.token, intro);
            }
        });
    }
}

module.exports = Tests;