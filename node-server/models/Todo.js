const { text } = require('express');
const mongoose= require('mongoose');

const todoschema=new mongoose.Schema(
    {
        text:{
            type:String,
            required:true,


        },
        completed:{
            type:Boolean,
            default:false,

        }
    }
)
 const Todo=mongoose.model('Todo',todoschema);
module.exports=Todo