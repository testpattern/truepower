'use strict'

class MeterReading {
    
    respond(selection) {
        return this[selection]();
    }

    welcome() {
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"Is it about a meter reading?",
                    "buttons":[{
                        "type":"postback",
                        "title":"Yes",
                        "payload":"MeterReading-intro"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"MeterReading-no"
                    }]
                }
            }
        }
    }

    intro() {
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"Have you given us a meter reading recently?",
                    "buttons":[{
                        "type":"postback",
                        "title":"Yes",
                        "payload":"MeterReading-yes"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"MeterReading-no"
                    }]
                }
            }
        }
    }

    yes(){
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"When did you submit the reading?",
                    "buttons":[{
                        "type":"postback",
                        "title":"Within 5 days",
                        "payload":"MeterReading-result"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"MeterReading-yes"
                    }]
                }
            }
        }
    }

    result(){
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"When did you submit the reading?"
                }
            }
        }
    }
}

module.exports = MeterReading;