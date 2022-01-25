const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const body = req.body
    const user = await User.findOne({username: body.username})
    const passwordIsCorrect = user != null 
        && await bcrypt.compare(body.password, user.passwordHash)
    if(!passwordIsCorrect){
        return res.status(401).send({error: "invalid username or password"})
    }
    const tokenData = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(tokenData, process.env.SECRET)

    res.status(200).send({token, id: user.id, username: user.username, name: user.name})
})

module.exports = loginRouter