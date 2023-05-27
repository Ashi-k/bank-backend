//import mongoose
const mongoose=require("mongoose")

//state connection string
mongoose.connect('mongodb://127.0.0.1:27017/bankServer',{useNewUrlParser:true})

//model(schema) creation (model name must be singular of collecction 
//name and first letter capital)

//scchema means fields and values

const user=mongoose.model('user',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    user  
}