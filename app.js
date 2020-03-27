const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    
    let method =req.body.events[0].method
    let  reply_token = req.body.events[0].replyToken
    let  msg=req.body.events[0].messages.text

  
   
    
    reply(reply_token,msg,method)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token,msg,method) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sKJLbqM9qS/wDlLuitbNMKhGeJ7zN1mkrLk8RIkiZsvifG051efF/iCtHT4fMHA2jMnStRYUMOKU+bY+yzZ3CTfOUDH+ULXQCeOYTkMsSLOQv+d67caQWLI1sp/Opr40w3SdgJQfLKqwpkABjTjtpQdB04t89/1O/w1cDnyilFU='
    }
    if (method === "POST") {
        let body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: msg
            }]
        })
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });
    }else if (method === "fOLLOW"){

    }
   
   
}
