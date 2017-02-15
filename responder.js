'use strict';

let PaymentDifference = require('./responders');
//let paymentDifference = new PaymentDifference();

class Responder {

    constructor() {
        // add all the responders
        let paymentDifference = new PaymentDifference();
        this.responders = [{name: "PaymentDifference", value: paymentDifference}
        ];
    }

    find(name){
        var result = this.responders.find(function(item) {
            return item.name === name;
        });
        return result;
    }

    respond(name, selection) {
        var responder = this.find(name);
        return responder.value.respond(selection);
    }

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