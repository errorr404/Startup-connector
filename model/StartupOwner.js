const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StartupOwnerSchema = new Schema ({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports = StartupOwner = mongoose.model('StartupOwner',StartupOwnerSchema);