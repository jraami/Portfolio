const portfolioRouter = require('express').Router()
const WebHook = require('./webhook')
const jwt = require('jsonwebtoken')

portfolioRouter.get('/', (request, response) => {
    WebHook.trigger('localhost', { data: 123456 }, { header: 'header' })
    response.status(200).send({ error: 'grrreat' })
})

portfolioRouter.post('/', (request, response) => {
    console.log("webhook arrived")
    const note = request.body
    response.json(note)
}
)
module.exports = portfolioRouter