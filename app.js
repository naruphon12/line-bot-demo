const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let msg
let text2

app.post('/webhook', (req, res) => {
    if (req.method === 'POST') {
        let reply_token = req.body.events[0].replyToken
        msg = req.body.events[0].message.text
        reply2(req.body)
        //reply(req.body, msg,reply_token)

    }else{
        let reply_token = req.body.events[0].replyToken
         msg = req.body.events[0].message.text
         //reply(req.body, msg,reply_token)
         reply2(req.body)
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
        if (msg.text ==='สวัสดี'){
            body = JSON.stringify({
               replyToken: reply_token,
               messages: [{
                   type: 'text',
                   text: msg
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

        body = JSON.stringify({
            to: bodyResponse.events[0].source.userId,
            messages: [{
                type: 'text',
                text: 'สวัสดี'
            }]
        })
    }else if (type ==='location'){
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

function reply2(bodyResponse) {

    const getTestSoap = async () => {
 
        var options = {
          method: 'POST',
          url: 'http://feedkbf.cpf.co.th/FeedWsKABIN/WebService.asmx',
          headers:
          {
            soapaction: 'http://tempuri.org/ProductionPlan',
            host: 'feedkbf.cpf.co.th',
            'content-type': 'text/xml; charset=utf-8'
          },
          //body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body> <registerline xmlns="http://tempuri.org/">     <JsonStr>{"Data":[{"User_ID":"1111111111","Phone_No":"0882219724","Email":"naruphon.boo","Nameline":"ball"}]}</JsonStr>   </registerline></soap:Body></soap:Envelope>'
          body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ProductionPlan xmlns="http://tempuri.org/">    <JsonStr>{"Data" :[{"PlantCode":"301610","ProductionLine":"TEST22","PlanDate":"2019-01-31","PlanJob":"190001","RecipeIdent":"510","RecipeName":"510 CHICKEN","RecipeDate":"2019-01-18", "PlanWeight":"12000","TotalBatch":"3"}]}</JsonStr>   </ProductionPlan> </soap:Body></soap:Envelope>'
       
        };
        request(options, function (error, response, cb) {
          if (error) throw new Error(error);
          text2="1"
           console.log(cb);
        });
        text2="2"
        console.log(cb);
      }
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sKJLbqM9qS/wDlLuitbNMKhGeJ7zN1mkrLk8RIkiZsvifG051efF/iCtHT4fMHA2jMnStRYUMOKU+bY+yzZ3CTfOUDH+ULXQCeOYTkMsSLOQv+d67caQWLI1sp/Opr40w3SdgJQfLKqwpkABjTjtpQdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        to: bodyResponse.events[0].source.userId,
        messages: [{
            type: 'text',
            text: text2
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/push',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
      module.exports = {
        
        getTestSoap
      
      }
    }
