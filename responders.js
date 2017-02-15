'use strict'

class Welcome {
    intro() {

    }

    yes() {

    }

    no() {
        
    }
}

class PaymentDifference {

    //text = "Was the amount different to what you expected to pay?";

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
                    "payload":"paymentDifference-yes"
                },
                {
                    "type":"postback",
                    "title":"No",
                    "payload": "paymentDifference-no"
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
    no(){

    }
}

module.exports = PaymentDifference;