const express = require("express")
const { PostModel } = require("../Models/Post.model")
const { UserModel } = require("../Models/User.model")
require("dotenv").config()
const PostRouter = express.Router()
PostRouter.use(express.json())
const fs = require("fs")

PostRouter.get("/posts", async (req, res) => {
    try {
        const data = await PostModel.find()
        res.send(data)
    } catch (error) {
        res.status(404).send(error)
    }
})

PostRouter.get("/posts/:id", async (req, res) => {
    try {
        let ID = req.params.id
        const data = await PostModel.find({ "_id": ID })
        res.send(data)
    } catch (error) {
        res.status(404).send(error)
    }
})

PostRouter.post("/posts", async (req, res) => {
    try {
        let body = req.body
        const data = new PostModel(body)
        await data.save()
        res.status(201).send({ "message": "Post Added", data })
    } catch (error) {
        res.status(404).send(error)
    }
})

PostRouter.patch("/posts/:id", async (req, res) => {
    let ID = req.params.id
    const data = await PostModel.findByIdAndUpdate({ "_id": ID }, req.body)
    const upd = await PostModel.find({ "_id": ID })
    res.send({ "message": "Post updated successful", "Updated Post": upd })
})

PostRouter.delete("/posts/:id", async (req, res) => {
    let ID = req.params.id
    await PostModel.findByIdAndDelete({ "_id": ID })
    const upd = await PostModel.find()
    res.send({ "message": "Post deleted successful", "Updated data": upd })
})

let lbox = []
PostRouter.post("/posts/:id/like", async (req, res) => {
    let ID = req.params.id
    let liker = fs.readFileSync("decoded.txt", 'utf8')
    lbox.push(liker)
    let { _id, user, text, image, createdAt, likes, comments } = await PostModel.find({ "_id": ID })
    let body = { _id, user, text, image, createdAt, likes: lbox, comments }
    let Post = await PostModel.findByIdAndUpdate({ "_id": ID }, body)
    const upd = await PostModel.find({ "_id": ID })
    res.send(upd)
})

let cbox = []
PostRouter.post("/posts/:id/comment", async (req, res) => {
    let ID = req.params.id
    let Text = req.body.text
    let comentr = fs.readFileSync("decoded.txt", 'utf8')
    let arr = {
        user: comentr,
        text: Text,
        createdAt: new Date()
    }
    cbox.push(arr)
    let { _id, user, text, image, createdAt, likes, comments } = await PostModel.find({ "_id": ID })
    let body = { _id, user, text, image, createdAt, likes, comments:cbox }
    let Post = await PostModel.findByIdAndUpdate({ "_id": ID }, body)
    const upd = await PostModel.find({ "_id": ID })
    res.send(upd)
})


module.exports = {
    PostRouter
}