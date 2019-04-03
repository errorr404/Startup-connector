const express = require('express');
const router = express.Router();
// var Todo = require("../model/Todo");

router.get('/api',(req,res)=>{
    res.status(200).send({"message":"server is up"})
})

module.exports = router