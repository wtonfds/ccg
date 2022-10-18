//initial config
require('dotenv').config
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

// middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const weaponRoutes = require('./routes/weaponRoutes')
app.use('/weapon', weaponRoutes)

mongoose.connect(
    `mongodb+srv://wtonfds:wton.fds.2013@apicluster.nmhs7.mongodb.net/maindb?retryWrites=true&w=majority`
).then(
    () => {
        console.log('MongoDB conectado')
        app.listen(port)
    }
).catch(
    (err) => console.log(err)
)
