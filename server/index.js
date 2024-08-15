const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const TodoModel= require('./Models/Todo');
const app=express();
app.use(cors());
app.use(express.json());
const uri="mongodb+srv://jim:1234@todoapp.bgeez.mongodb.net/?retryWrites=true&w=majority&appName=todoapp";

mongoose.connect(uri, {dbName:"todos"});
app.post('/add',(req,res)=>{
    const task= req.body.task;
    TodoModel.create({
        task:task
    }).then(result=>res.json(result))
    .catch(err=>res.json(err))
})
app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err));
})
app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findOneAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))

})
app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findOneAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))

})
app.listen(3000,()=>{
    console.log('server is listening');
})

