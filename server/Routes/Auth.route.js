const express = require('express');
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.model')
const Employee = require('../Models/Employee.model')
const {authSchema} = require('../helpers/validation_schema')
const { signAccessToken, verifyAccessToken } = require('../helpers/jwt_helpers');
const { getRoleListById } = require('../Services/RoleList');
const { getEmployeeById } = require('../Services/Employee');

router.post('/login',async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)

        const user = await Employee.findOne({email: result.email})
        if(!user) throw createError.NotFound("User not registered")

        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) throw createError.Unauthorized("Username/password not valid")
      
        
        const role = await getRoleListById(user.role_id)
        if(!role) throw createError.NotFound("User has no role")
        
        const accessToken = await signAccessToken(user.id, role.name)

        res.send({token: accessToken, role: role.name, user: {
            first_name: user.first_name,
            last_name: user.last_name,
            profile: user.profile_picture_id,
            email: user.email,
            role: role.name
        }})
    } catch (error) {
        if(error.isJoi === true) return next(createError.BadRequest('Invalid Email/Password'))
        next(error)
    }
})
router.get('/verify-user', verifyAccessToken, async (req, res, next) => {
    try {
        const user_id = req.payload.userId;
        const user = await getEmployeeById(user_id);

        if (!user) {
            throw createError(404, "User not found");
        }

        res.send({
            first_name: user.first_name,
            last_name: user.last_name,
            profile: user.profile_picture_id,
            email: user.email,
            role: req.payload.role
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete('/logout',async (req, res, next) => {
    res.send('Logout route')
})

router.post('/refresh-token',async (req, res, next) => {
    res.send('Refresh Token route')
})

module.exports = router