const error = (request, response) => {
    response.status(404).send({ error: 'try again, better luck etc.' })
}
module.exports = { error }
