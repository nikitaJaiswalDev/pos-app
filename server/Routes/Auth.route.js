const express = require('express');
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.model')
const {authSchema} = require('../helpers/validation_schema')
const { signAccessToken } = require('../helpers/jwt_helpers')

router.post('/register',async (req, res, next) => {
    try {
       const { email, password } = req.body
       const result = await authSchema.validateAsync(req.body)

       const doesExists = await User.findOne({email: result.email})
        if(doesExists) throw createError.Conflict(`${result.email} already exixts`)

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)

        res.send({message: "User Added Successfully"})

    } catch (error) {
        if(error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login',async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email: result.email})
        if(!user) throw createError.NotFound("User not registered")

        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) throw createError.Unauthorized("Username/password not valid")

        const accessToken = await signAccessToken(user.id)

        res.send({accessToken})
    } catch (error) {
        if(error.isJoi === true) return next(createError.BadRequest('Invalid Email/Password'))
        next(error)
    }
})

router.delete('/logout',async (req, res, next) => {
    res.send('Logout route')
})

router.post('/refresh-token',async (req, res, next) => {
    res.send('Refresh Token route')
})

module.exports = router