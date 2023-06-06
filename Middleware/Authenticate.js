const express = require("express")
const jwt = require("jsonwebtoken")
const fs = require("fs")
require("dotenv").config()
const Authenticate = async (req, res, next) => {
    const token = await req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.secretKey, async (err, decode) => {
            if (decode) {
                fs.writeFileSync("decoded.txt", decode.UserId)
                next()
            }
            else if(err){
                res.send(err)
            }
        })
    }
    else {
        res.status(404).send("Please login first")
    }
}

module.exports = {
    Authenticate
}
