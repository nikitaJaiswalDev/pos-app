const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const EmployeeSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    profile_picture_id: {
        type: String,
        required: true,
    },
    role_id: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

EmployeeSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)   
    }
})

EmployeeSchema.methods.isValidPassword = async function (password) {
    try {
       return await bcrypt.compare(password, this.password) 
    } catch (error) {
        throw error
    }
}

const Employee = mongoose.model('employee', EmployeeSchema)
module.exports = Employee