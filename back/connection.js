const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://altair:ZDtt4kh2u63GiYjq@cluster0.ro7kdll.mongodb.net/MERNchat?retryWrites=true&w=majority', ()=>{
    console.log("Connected to Mongo DB")
})
