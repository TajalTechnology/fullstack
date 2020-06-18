const express = require('express') //import express

const router = express.Router()


router.get('/', (req, res, next) =>{
    res.send('HHello')

})

router.post('/', (req, res, next) =>{
    res.send('This is from post request')
})

module.exports =router


