const express = require('express')
const app = express()

const rooms = ['tech', 'finance', 'general', 'crypto']
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
require('./connection')

const server = require('http').createServer(app)
const PORT = '5001'
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})


server.listen(PORT, ()=>{
    console.log(`Server start at port: ${PORT}`)
})
