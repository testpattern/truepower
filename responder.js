'use strict';

class Responder {	
    yes1() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Was the amount different to what you expected to pay?",
                "buttons":[{
                    "type":"postback",
                    "title":"Yes",
                    "payload":"yes2"
                },
                {
                    "type":"postback",
                    "title":"No",
                    "payload": "no2"
                }]
                }
            }
        }
    }
    
    yes2() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Was your bill higher or lower than you expected?",
                "buttons":[{
                    "type":"postback",
                    "title":"Higher",
                    "payload":"yes3"
                },
                {
                    "type":"postback",
                    "title":"Lower",
                    "payload": "no3"
                }]
                }
            }
        }
    }
}

module.exports = Responder;