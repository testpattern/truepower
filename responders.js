'use strict'

class Welcome {
    respond(sender){
        let messageData = {        
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Hi. What can I help you with today - is your question about a (recent) bill?",
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
                    "title":"No",
                    "payload": "PaymentDifference-unsure"
                }]
                }
            }
        }
        request({
            url: "https://graph.facebook.com/v2.6/me/messages",
            qs: {access_token:token},
            method: 'POST',
            json: {
                recipient: {id:sender},
                message: messageData,
            }
            }, function(error, response, body) {
                if (error) {
                    console.log('Error sending messages: ', error)
                } else if (response.body.error) {
                    console.log('Error: ', response.body.error)
                }
        })
    }
}

modeul.exports = Welcome;

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