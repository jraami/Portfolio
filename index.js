const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const WebSocket = require('ws')
const dialogflowRouter = require('./routers/dialogflow')
const portfolioRouter = require('./routers/portfolio')
const chatRouter = require('./routers/chat')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

mongoose
    .connect(config.mongoUrl)
    .then(() => console.log('Connected to database.'))
    .catch(err => console.log(err))

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
if (process.env.NODE_ENV === 'test') {
    morgan.token('bodycontent', function (req, res) { return JSON.stringify(req.body) })
    app.use(morgan(':method :url :bodycontent :status :res[content-length] - :response-time ms'))
}
app.use('/api/dialogflow', dialogflowRouter)
app.use('/api/portfolio', portfolioRouter)
app.use('/api/chat', chatRouter)
app.use(middleware.error)

const server = http.createServer(app)

const wss = new WebSocket.Server({ port: config.wsPort })

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received %s', message)
    })
    ws.send('something')
})


server.listen(config.port, () => {
    console.log('Server running on port', config.port)
    console.log('Websocket running on port', config.wsPort)
})
server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}