const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    heading:{type:String,unique:true,require:true},
    body:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model('task',taskSchema)