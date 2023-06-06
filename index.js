const express = require("express")
const { connection } = require("./config/db")
const { UserRouter } = require("./Routes/User.Route")
const { PostRouter } = require("./Routes/Post.Route")
const { Authenticate } = require("./Middleware/Authenticate")
const {FriendRouter} = require("./Routes/Friend.Route")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Home")
})

app.use("/user", UserRouter)

app.use(Authenticate)

app.use("/post", PostRouter)

app.use("/reqst",FriendRouter)

app.listen(2200, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Port 2200")
})