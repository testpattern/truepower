'use strict'

class MessageBuilder {
    buildMessage(text, buttons) {
        return { 
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons": buttons
                }
            }
        }
    }
}

/*
buttons: [{
    "type":"postback",
    "title":"Yes",
    "payload":"yes2"
    },
    {
    "type":"postback",
    "title":"No",
    "payload": "no2"
}]*/