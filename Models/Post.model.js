
const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
        user: { type: String, required: true },
        text: { type: String, required: true },
        image: { type: String, required: true },
        createdAt: { type: Date, required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId , ref: 'user', required: true  }],
        comments: [{
          user: { type: String, required: true  },
          text: { type: String, required: true },
          createdAt: { type: Date, required: true }
        }]
}, {
    versionKey: false
})

const PostModel = mongoose.model("Post", PostSchema)

module.exports = {
    PostModel
}

