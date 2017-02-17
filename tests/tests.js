'use strict'

class Tests {

    constructor(run) {

        var functions = Object.getOwnPropertyNames(this);
        console.log(functions);

        if (run) {
            this.image();
            this.intro();
        }
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
        let sender = "1235693409813391";
        let token = "EAAaXW9BqZA2IBAGQgmZBZAyEeMg5CJHNmlT9Wogej50lytdSICHtdHqqFZBldXwnXutUNZC7fHz4NIy7cOq1C5xIqL9z78A1ab2MuBrlXDEl9MvZADRHJC5U8GkOIdeNNlZBKLuThTbMGBpEcOqGXhrmvAZAsFTw6T2xjHkwg6vOZAAZDZD";
        request({
            url: `https://graph.facebook.com/v2.6/${sender}?fields=first_name&access_token=${token}`,
            method: 'GET'
        }, function(error, response, body){
            console.log('user name');
            if (body.length) {
                firstname = JSON.parse(body).first_name;
                let intro = { 
                    "text" : "Hi " + firstname + ". What can I help you with today? :)" 
                }
                responder.sendMessage(sender, token, intro);
            }
        });
    }
}

module.exports = Tests;