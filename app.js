const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let msg

app.post('/webhook', (req, res) => {
    if (req.method === 'POST') {
        let reply_token = req.body.events[0].replyToken
        msg = req.body.events[0].message.text
        reply(req.body, msg,reply_token)
        
    }else{
        let reply_token = req.body.events[0].replyToken
         msg = req.body.events[0].message.text
        reply2(reply_token)
    }
 res.sendStatus(200)
})
app.listen(port)
function reply(bodyResponse, msg,reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sKJLbqM9qS/wDlLuitbNMKhGeJ7zN1mkrLk8RIkiZsvifG051efF/iCtHT4fMHA2jMnStRYUMOKU+bY+yzZ3CTfOUDH+ULXQCeOYTkMsSLOQv+d67caQWLI1sp/Opr40w3SdgJQfLKqwpkABjTjtpQdB04t89/1O/w1cDnyilFU='
    }
    let body
    let type =bodyResponse.events[0].message.type
    if (type ==='text'){
        if (msg ==='สวัสดี'){
            body = JSON.stringify({
               replyToken: reply_token,
               messages: [{
                   type: 'text',
                   text: 'สวัสดีครับ'
               }]
           })
       }else{
            body = JSON.stringify({
               to: bodyResponse.events[0].source.userId,
               messages: [{
                   type: 'text',
                   text: JSON.stringify(bodyResponse)
               }]
           })
       }
    }else if (type ==='image'){

    }else if (type ==='location'){

    }
   
   
    request.post({
        url: 'https://api.line.me/v2/bot/message/push',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
function reply1(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sKJLbqM9qS/wDlLuitbNMKhGeJ7zN1mkrLk8RIkiZsvifG051efF/iCtHT4fMHA2jMnStRYUMOKU+bY+yzZ3CTfOUDH+ULXQCeOYTkMsSLOQv+d67caQWLI1sp/Opr40w3SdgJQfLKqwpkABjTjtpQdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'สวัสดี'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
function reply2(reply_token) {
    let headers = {
        'Host': 'localhost',
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': 'length',
        'SOAPAction': 'http://tempuri.org/register',  
    }
    let body = JSON.stringify({
      messages: [{
            type: 'text',
            text: 'สวัสดี'
        }]
    })
    request.post({
        url: 'http://localhost:52108/WebService.asmx',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
