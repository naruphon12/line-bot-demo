const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let msg
var phonenumber
var substring
app.post('/webhook', (req, res) => {
    if (req.method === 'POST') {
        let reply_token = req.body.events[0].replyToken
        msg = req.body.events[0].message.text
    if (req.body.events[0].type === 'message') {
            substring=req.body.events[0].message.text
            substring=substring.substr(0, 5); 
           //substring=findsubstr(req.body.events[0].message.text,reply_token)
         if (substring ==='#123#'){
             substring=''
             Registerline(req.body,reply_token)
          }else{
             reply(req.body, msg,reply_token)
          }
    }else if(req.body.events[0].type === 'follow'){
        
         Registerline(req.body,reply_token)
    }else if(req.body.events[0].type === 'unfollow'){
       
         Registerline(req.body,reply_token)
    }
    }
 res.sendStatus(200)
})
app.post('/Sendorder', (req, res) => {
  
    Sendorder(req.body)
     
 res.sendStatus(200)
})
app.listen(port)
function reply(bodyResponse, msg,reply_token) {
    try {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sKJLbqM9qS/wDlLuitbNMKhGeJ7zN1mkrLk8RIkiZsvifG051efF/iCtHT4fMHA2jMnStRYUMOKU+bY+yzZ3CTfOUDH+ULXQCeOYTkMsSLOQv+d67caQWLI1sp/Opr40w3SdgJQfLKqwpkABjTjtpQdB04t89/1O/w1cDnyilFU='
        }
        let body
        let type =bodyResponse.events[0].message.type
        if (type ==='text'){
            if (bodyResponse.events[0].message.text ==='สวัสดี'){
                body = JSON.stringify({
                   replyToken: reply_token,
                   messages: [{
                       type: 'text',
                       text: msg
                   }]
               })
           }else if(bodyResponse.events[0].message.text ==='Register') {
                body = JSON.stringify({
                   replyToken: reply_token,
                   messages: [{
                       type: 'text',
                       text: 'กรุณาใส่หมายเลขโทรศัพท์ เพื่อทำการลงทะเบียน โดยพิมพ์ #123#เบอร์โทรศัพท์ของท่าน เเล้วส่งมาที่ ไลน์'
                   }]
               })
           }else{
                 body = JSON.stringify({
                   replyToken: reply_token,
                   messages: [{
                       type: 'text',
                       text: JSON.stringify(bodyResponse)
                   }]
               })
           }
        }else if (type ==='image'){
    
            body = JSON.stringify({
                replyToken: reply_token,
                messages: [{
                    type: 'text',
                    text: 'รูป'
                }]
            })
        }else if (type ==='location'){
            body = JSON.stringify({
                replyToken: reply_token,
                messages: [{
                    type: 'text',
                    text: 'location'
                }]
            })
        }
       
       
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });

      }
      catch (e) {
        console.log(e);
        send(reply_token,e)
      }
      finally {
        
      }
   
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

function Registerline(bodyResponse,reply_token) {
let num="1"
   
    try {
        send(reply_token,num)
        var options = {
            method: 'POST',
            url: 'http://vm-feeduat/FeedLineBot/WebService.asmx',
            headers:
            {
              soapaction: 'http://tempuri.org/registerline',
              host: 'vm-feeduat',
              'content-type': 'text/xml; charset=utf-8'
            },
            body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body> <registerline xmlns="http://tempuri.org/">     <JsonStr>{"Data":[{"User_ID":"1111111111","Phone_No":"0882219724","Email":"naruphon.boo","Nameline":"ball"}]}</JsonStr>   </registerline></soap:Body></soap:Envelope>'
          };
          request(options, function (error, response, cb) {
            if (error) throw new Error(error);
           
             console.log(cb);
             
          });
      }
      catch (e) {
        console.log(e);
       
        send(reply_token,e)
      }
      finally {
      
        send(reply_token,e)
      }
      send(reply_token,e)
  }
    function send(reply_token,num)  {

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sKJLbqM9qS/wDlLuitbNMKhGeJ7zN1mkrLk8RIkiZsvifG051efF/iCtHT4fMHA2jMnStRYUMOKU+bY+yzZ3CTfOUDH+ULXQCeOYTkMsSLOQv+d67caQWLI1sp/Opr40w3SdgJQfLKqwpkABjTjtpQdB04t89/1O/w1cDnyilFU='
        }
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: 'สวัสดี  '+ num
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
  function Sendorder(bodyResponse) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sKJLbqM9qS/wDlLuitbNMKhGeJ7zN1mkrLk8RIkiZsvifG051efF/iCtHT4fMHA2jMnStRYUMOKU+bY+yzZ3CTfOUDH+ULXQCeOYTkMsSLOQv+d67caQWLI1sp/Opr40w3SdgJQfLKqwpkABjTjtpQdB04t89/1O/w1cDnyilFU='
    }
    body = JSON.stringify({
        to: bodyResponse.events[0].source.userId,
        messages: [{
            type: "image",
            originalContentUrl: bodyResponse.events[0].message.text ,
            previewImageUrl: bodyResponse.events[0].message.text 
        }]
    })
    
      request.post({
        url: 'https://api.line.me/v2/bot/message/push',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
    }
    function findsubstr(str,reply_token) { 
        
      substring = str.substr(0, 5); 
      phonenumber= str.substr(5, 15); 
      send(reply_token,substring)
      
      send(reply_token,phonenumber)
        
    } 
