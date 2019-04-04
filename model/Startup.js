const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StartupSchma = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    ceo_name:{
        type:String,
        required:true,
    },
    cto_name:{
        type:String
    },
    address:{
        type:String,
        required:true,
    },
    website:{
        type:String,
    }
})

module.exports = Startup = mongoose.model('Startup',StartupSchma);