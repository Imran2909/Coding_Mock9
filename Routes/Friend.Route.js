const express = require("express")
const { UserModel } = require("../Models/User.model")
const fs = require("fs")

const FriendRouter = express.Router()
FriendRouter.use(express.json())

let frr=[]
let acc=[]
FriendRouter.post("/users/:id/friends", async(req,res)=>{
    ID= req.params.id
    let usr = fs.readFileSync("decoded.txt", 'utf8')
    let {_id,name,email,password,dob,bio,posts,friends,friendRequests }=await UserModel.find({"_id":ID})
    frr.push(usr)
    let body = {_id,name,email,password,dob,bio,posts,friends,friendRequests:frr }
    await UserModel.findByIdAndUpdate({ "_id": ID }, body)
    const upd = await UserModel.find({ "_id": ID })
    res.send(upd)
})
FriendRouter.patch("/users/:id/friends/:friendId", async(req,res)=>{
     ID= req.params.id 
     fid= req.params.friendId 
     data= req.body.text 
     

    const dataa=await UserModel.find({"_id":ID})
    const {_id,name,email,password,dob,bio,posts,friends,friendRequests }=dataa[0]
    let arr=friendRequests
    let far=friends
    for(let i=0;i<arr.length;i++){
        if(arr[i]==fid && data=="YES"){
            far.push(arr[i])
            arr.splice(i,1)
        }
        else if(arr[i]==fid && data=="NO"){
            far.push(arr[i])
            arr.splice(i,1)
        }
    }
    let body = {_id,name,email,password,dob,bio,posts,friends:far,friendRequests:arr }
    await UserModel.findByIdAndUpdate({ "_id": ID }, body)
    const upd = await UserModel.find({ "_id": ID })
    res.send(upd)

})


FriendRouter.get("/users/:id/friends", async(req,res)=>{
    ID= req.params.id
    let data = await UserModel.find({"_id":ID})
    res.send(data[0].friendRequests)

})


module.exports={
    FriendRouter
}