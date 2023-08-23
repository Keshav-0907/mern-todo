const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 8080
const app = express()

app.use(express.json())
app.use(cors())

const Todo = require('./models/todos')

mongoose.connect('mongodb+srv://kmalik0907:uxE3y6vrTsAqI7Kq@cluster0.0afuvzs.mongodb.net/mern-todos?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("DB Connected"))
.catch( console.error)

app.get('/', (req, res)=>{
    res.send("/todos pr jao")
})

app.get('/todos', async (req, res)=>{
    const todos = await Todo.find()

    res.json(todos)
})

app.post('/todos/new', (req, res)=>{
    const todo = new Todo({
        text:req.body.text
    })

    todo.save()
    res.json(todo)
})

app.delete('/todos/delete/:id', async (req, res)=>{
    const delete_todo = await Todo.findByIdAndDelete(req.params.id)
    res.json(delete_todo)
})

app.put('/todos/complete/:id', async(req, res)=>{
    const complete_todo = await Todo.findById(req.params.id)

    complete_todo.complete = !complete_todo.complete
    
    complete_todo.save()
    res.json(complete_todo)
})

app.listen(PORT, ()=>{
    console.log(`Runing on ${PORT}`)
})