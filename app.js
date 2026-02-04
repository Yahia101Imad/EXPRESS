// IMPORT PACKAGE
const express = require('express')
const app = express()

// ROUTING (HTTP METHOD, URL)
app.get('/', (req, res) => {
    res.status(200).send('Hi this is the app')
})


// SERVER
app.listen(3000, () => {
    console.log('The server in listening !')
})