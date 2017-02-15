'use strict'

class PaymentDifference {

    respond(selection) {
        return this[selection]();
    }

    aboutBillYes() {
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

    aboutBillNo() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Is it about a meter reading?",
                "buttons":[{
                    "type":"postback",
                    "title":"Yes",
                    "payload":"Meter-yes"
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
                "text":"Ok. What can I help you with?"
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
                        "payload":"Payment-amount"
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

    lower() {
        return {
            "attachment": {
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "elements":[{
                        "image_url":"https://thechangreport.com/img/lightning.png",                
                        "buttons": [{
                            "type":"element_share"
                        }]
                    }]
                }
            }
        }
    }
}

module.exports = PaymentDifference;