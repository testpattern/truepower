'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

class Responder {

    constructor() {
        this.responses = require('./responses.json');
    }
    
    respond(sender, token, payload) {
        var parent = payload.split('.')[0];
        var child = payload.split('.')[1];

        var result = this.responses.find(function(item) {
            return item.section === parent;
        });

        var option = result.items.find(function(item) {
            return item.name === child;
        });

        this.sendMessage(sender, token, option.message);
    }

    getUserFirstname(sender, token, callback) {
        request({
            url: `https://graph.facebook.com/v2.6/${sender}?fields=first_name&access_token=${token}`,
            method: 'GET'
        }, function(error, response, body) {
            if (body.length) {
                callback(JSON.parse(body).first_name); 
            }
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            }
        })
    }

    sendMessage(sender, token, message) {
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
}

module.exports = Responder;