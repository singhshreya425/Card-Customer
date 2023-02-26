const express = require('express')
const mongoose = require('mongoose')
const route = require('./router/routers')
const app = express()

app.use(express.json())

mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://singhshreya425:shreyasingh1234@cluster0.yxxvuvg.mongodb.net/shreya526', { useNewUrlParser: true })
    .then(() => { console.log('MongoDB is connected') })
    .catch((error) => { console.log(error) })

app.use('/', route)

app.listen(3000, function () {
    console.log('Express app running on port ' + 3000)
})
