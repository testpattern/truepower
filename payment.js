'use strict'

class Payment {

    respond(selection) {
        return this[selection]();
    }

    details() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"You can set your payment details in your online account.\n"
                + "Go to <a href='#'>Account summary</a> and click 'Change your bank details'"                
                }
            }
        }
    }

    method() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Would you like to change to Direct Debit or change your Monthly DD payments"
                }
            }
        }
    }

    bill() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"You can find out when your next bill (statement) is due, along with your payment day, by going to <a href='#'>Account Summary</a>"
                }
            }
        }
    }

    date() {
        return {
            "attachment": {
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"You can see your payment date in your online account. Go to <a href='#'>Bills & Payments</a> and look for ‘Your payment details’"
                }
            }
        }
    }
}

module.exports = Payment;