'use strict'

class PaymentDifference {

    respond(selection) {
        return this[selection]();
    }

    yes() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Was your bill higher or lower than you expected?",
                "buttons":[{
                    "type":"postback",
                    "title":"Higher",
                    "payload":"PaymentDifference-higher"
                },
                {
                    "type":"postback",
                    "title":"Lower",
                    "payload": "PaymentDifference-lower"
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

    no() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Ok. What can I help you with?",
                "buttons":[{
                    "type":"postback",
                    "title":"I want to update my payment details",
                    "payload":"Payment-details"
                },
                {
                    "type":"postback",
                    "title":"I wanted to change how I pay my bill",
                    "payload": "Payment-method"
                },
                {
                    "type":"postback",
                    "title":"I haven't received a bill but I think I should have",
                    "payload": "Payment-bill"
                },
                {
                    "type":"postback",
                    "title":"I am confused about my payment date",
                    "payload": "Payment-date"
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
                "text":"Ok. What can I help you with?",
                "buttons":[{
                    "type":"postback",
                    "title":"I want to check I am paying the right amount",
                    "payload":"Payment-current"
                },
                {
                    "type":"postback",
                    "title":"I wanted to get a refund for a credit I was owed",
                    "payload": "Payment-refund"
                }]
                }
            }
        }
    }

    higher() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"It could be that",
                "buttons":[{
                    "type":"postback",
                    "title":"",
                    "payload":""
                },
                {
                    "type":"postback",
                    "title":"",
                    "payload": ""
                }]
                }
            }
        }
    }

    lower() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "image_url":"https://thechangreport.com/img/lightning.png",                
            "buttons":[
              {
                "type":"element_share"
              }]
            }
            }
        }
    }
}

module.exports = PaymentDifference;