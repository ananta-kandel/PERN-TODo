const express = require("express");
var cors = require('cors');
const app = express() ;
const PORT = 3001;
const pool = require("./db")

// middleware
app.use(cors());
app.use(express.json());


// Routes
// create to do list 

app.get("/",(req,res)=>{
  res.send("Hello world")
})
app.post("/todo",async(req,res)=>{
   try{
     const {description} = req.body;
     const NewTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *",[description])
    //  res.json(NewTodo.rows[0]);
   }
   catch(e){
    console.log(e)
   }
})

//for geting list

app.get("/todo",async(req,res)=>{
    try{
      const alltodo = await pool.query("SELECT * FROM todo");
      res.json(alltodo.rows);
    }
    catch(e){
        console.log(e);
    }
})



app.get("/todo/:id",async(req,res)=>{
    try{
        const { id }  = req.params;
       const todo = await pool.query("SELECT * FROM todo WHERE todoid = $1",[id]);
       res.json(todo.rows[0]);
    //  const todoid = await pool.query();
    //  res.json(todoid.rows[0])
    // console.log(req)
    //  res.json(req.params)
    }catch(e){
      console.log(e)
    }
})

// update route 

app.put("/todo/:id",async(req,res)=>{
    try{
      const {id} = req.params;
      const {description} = req.body;
      const todo = await pool.query("UPDATE todo SET description = $1 WHERE todoid = $2",[description, id]);
      res.json(todo.rows[0]);       
    }catch(e){

    }
})

app.delete("/todo/:id",async(req,res)=>{
    try{
      const {id} = req.params;
      const del = await pool.query("DELETE FROM todo WHERE todoid = $1",[id]);
      res.json({
        "message" :"deleted"
      })
    }
    catch{

    }
})
app.listen(PORT, ()=>{
    console.log(`Sever started on ${PORT}`)
})