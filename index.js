const express= require('express');
const app= express();
const mongoose= require('mongoose');
const todo= require('./models/todo');
var alert = require('alert');
const port=5500;

mongoose.connect("mongodb://localhost/ToDoList",{
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>{
    console.log("db connected");
})
app.listen(port,()=>
{
    console.log("Server live");
})
 app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/', async(req,res)=>{
    const todos= await todo.find({});
    //console.log(todos);
    console.log(todos.length);
    res.render("index",{todos});
})

app.get('/:id/delete', async(req,res)=>{
    await todo.findByIdAndDelete(req.params.id);;
    
    const todos= await todo.find({});
    
    res.redirect('/')
})
 
app.post('/',async(req,res)=>{
    console.log(req.body)
    // if(req.body==null){
    //     alert("Add a task...");
    // }
    const newTask= req.body.task.trim();
     if(newTask=="")
     {
        alert("Enter a task...");
        const todos= await todo.find().sort('-date');
       // res.render("index",{todos});
       res.redirect('/')
    }
    else{
        let addTask= new todo({
                task:newTask
        });
        //console.log(addTask);
        await addTask.save();
        //const todos= await todo.find({});
        //res.render("index",{todos});
        res.redirect('/')
    }
    
})