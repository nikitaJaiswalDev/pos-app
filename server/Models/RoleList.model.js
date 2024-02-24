const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    role_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
});

const RoleListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        type: [RoleSchema],
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
})

const RoleList = mongoose.model('role_list', RoleListSchema)
module.exports = RoleList