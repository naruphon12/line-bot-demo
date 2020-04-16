const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let msg

app.post('/webhook', (req, res) => {
    if (req.method = 'POST') {
        let reply_token = req.body.events[0].replyToken
        msg = req.body.events[0].message.text
        //reply2(reply_token)
        if (msg ='สวัสดี'){
            reply(req.body, msg,reply_token)
        }else{
            reply2(reply_token)
        }

         
        
    }else{
        let reply_token = req.body.events[0].replyToken
         msg = req.body.events[0].message.text
         //reply(req.body, msg,reply_token)
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
    if (type ='text'){
        if (msg ='สวัสดี'){
            body = JSON.stringify({
               replyToken: reply_token,
               messages: [{
                   type: 'text',
                   text: 'สวัสดีครับ'
               }]
           })
       }else if (msg ='test'){
            body = JSON.stringify({
               to: bodyResponse.events[0].source.userId,
               messages: [{
                   type: 'text',
                   text: JSON.stringify(bodyResponse)
               }]
           })
       }
    }else if (type ='image'){

        body = JSON.stringify({
            to: bodyResponse.events[0].source.userId,
            messages: [{
                type: 'text',
                text: 'รูปภาพ'
            }]
        })
    }else if (type ='location'){
        body = JSON.stringify({
            to: bodyResponse.events[0].source.userId,
            messages: [{
                type: 'text',
                text: 'location'
            }]
        })
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
    var options = { method: 'POST',
  url: 'http://localhost:52108/WebService.asmx',
  headers: 
   { 'postman-token': '4d4b4b88-fe56-0f2f-c610-37a42067ab08',
     'cache-control': 'no-cache',
     soapaction: 'http://tempuri.org/convertPdfToPicture',
     'content-length': 'length',
     'content-type': 'text/xml',
     host: 'localhost' },
  body: '<?xml version="1.0" encoding="utf-8"?>\r\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\r\n  <soap:Body>\r\n    <convertPdfToPicture xmlns="http://tempuri.org/">\r\n      <JsonStr>{"Data":[{"Plant_code":"301610","FileName":"12345_12345_12345.pdf","Customer_Code":"2019-01-31","Doc_No":"1","Date_Parm":"2019-09-07 18:02:08","Type_Parm":"1"}]}</JsonStr>\r\n    </convertPdfToPicture>\r\n  </soap:Body>\r\n</soap:Envelope>' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

}
