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
                }]
                }
            }
        }
    }
}

module.exports = PaymentDifference;