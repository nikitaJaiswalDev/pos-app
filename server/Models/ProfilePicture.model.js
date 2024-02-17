const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfilePictureSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    }
},{
    timestamps: true,
})

const ProfilePicture = mongoose.model('profile_picture', ProfilePictureSchema)
module.exports = ProfilePicture