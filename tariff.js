'use strict'

class Tariff {
    
    respond(selection) {
        return this[selection]();
    }

    intro() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Was the amount different to what you expected to pay?",
                "buttons":[{
                    "type":"postback",
                    "title":"Yes",
                    "payload":"PaymentDifference-yes"
                },
                {
                    "type":"postback",
                    "title":"No",
                    "payload": "PaymentDifference-no"
                },
                {
                    "type":"postback",
                    "title":"Unsure",
                    "payload": "PaymentDifference-unsure"
                }]
                }
            }
        }
    }

    down() {
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"And did you expect your bill to go down as a result?",
                    "buttons":[{
                        "type":"postback",
                        "title":"Yes",
                        "payload":"Tariff-yes"
                    },
                    {
                        "type":"postback",
                        "title":"Unsure",
                        "payload": "Tariff-unsure"
                    }]
                }
            }
        }
    }

    yes() {
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"It might be that your account is yet to be updated for this billing cycle. Or it might be that we don't have a recent meter reading.\nHave you give us a meter reading recently?",
                    "buttons":[{
                        "type":"postback",
                        "title":"Yes",
                        "payload":"MeterReading-yes"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload": "MeterReading-no"
                    }]
                }
            }
        }
    }

    unsure() {
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"It might be that you've gone on to our standard tariff. Have a look on your bill. It will say here."                
                }
            }
        }
    }

    end() {
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":"It might be that...",
                    "buttons":[{
                        "type":"postback",
                        "title":"Yes",
                        "payload":"MeterReading-intro"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload": "MeterReading-no"
                    }]
                }
            }
        }
    }
}

module.exports = Tariff;