const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const Todo= require('../models/Todo');

 router.get('/', async (req,res)=>{
    try{
        const todos= await Todo.find()
        res.json(todos)
        

    }
    catch(err){
        res.status(505).json({
            message:err.message
        });
    }

});
 router.post('/', async (req,res)=>{
    const todo=new Todo({
        text:req.body.text
    })
    
    try{
        const newTodo= await todo.save();
        res.status(201).json(newTodo);
        console.log(newTodo)

    } catch(err){
        res.status(505).json({
            message:err.message
        });
    }

 });
 router.put('/:id', async (req,res)=>{
    try{
        const Updatetodo=await Todo.findByIdAndUpdate(req.params.id , req.body , {new:true});
        res.json(Updatetodo)
    } catch(err){
        res.status(505).json({
            message:err.message
        });
    }
 });
 router.delete('/:id', async (req,res)=>{
    try{
    const DeleteTodo= await Todo.findByIdAndDelete(req.params.id)
    res.json({message:'the requested id has been delete'})
    } catch(err){
        res.status(505).json({
            message:err.message
        });
    }

 });
 module.exports= router;
