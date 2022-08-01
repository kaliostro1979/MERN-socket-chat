const router = require('express').Router()
const User = require('../models/User')


//creating user

router.post('/', async (req, res)=>{
    try{
        const {name, email, password, picture} = req.body
        const user = User.create({name, email, password, picture})
        res.status(201).json(user)
    }catch (e){
        let msg
        if (e.code == 11000){
            msg = "User already exist"
        }else {
            msg = e.message
        }
        res.status(400).json(msg)
    }
})

//Login User

router.post("/login", async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        user.status = 'online'
        await user.save()
        res.status(200).json(user)
    }catch (e){
        res.status(400).json(e.message)
    }
})

module.exports = router