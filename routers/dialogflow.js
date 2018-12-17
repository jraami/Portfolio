const dialogflowRouter = require('express').Router()
const jwt = require('jsonwebtoken')
var WebHook = require('node-webhooks')

WebHook = new WebHook({
    db: { "addPost": ["http://localhost:3002/api/dialogflow"] }
})

WebHook
    .add('localhost', 'http://localhost:3002/api/portfolio')
    .then(function () {
        console.log("webhook post sent")
    })
    .catch(function (err) {
        console.log(err)
    })

dialogflowRouter.get('/', async (request, response) => {
    WebHook.trigger('localhost', { data: 123456 }, { header: 'header' })
    response.status(200).send({ error: 'grrreat dialogflow' })
})

module.exports = dialogflowRouter