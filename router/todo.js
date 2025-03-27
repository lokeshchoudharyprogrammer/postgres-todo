const express =require("express");
const todoRouter=express();

const pool=require("../db");


todoRouter.get("/",async(req,res)=>{
    try {
        const todos=await pool.query('SELECT * FROM todo ORDER BY id DESC')
        res.json(todos.rows)
        
    } catch (error) {
        res.status(500).json({
            err:error
        })
        
    }
})

todoRouter.post("/",async(req,res)=>{
    const {title} =req.body;
    try {
        const todos=await pool.query(
            'INSERT INTO todo (title) VALUES ($1) RETURNING *',
            [title] 
        )
        
        res.json(todos.rows)
    } catch (error) {
        res.status(500).json({
            err:error
        })
    }
})

todoRouter.put("/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const update_todo=await pool.query(
            'UPDATE todo SET completed = NOT completed WHERE id= $1 RETURNING * ',
            [id]
        )

        res.json({
            data:update_todo.rows
        })
        
    } catch (error) {
        res.status(500).json({
            err:error
        })
        
    }
})


todoRouter.delete("/:id",(req,res)=>{
    const {id}=req.params;
    try {

        const delete_todo=pool.query(
            'DELETE FROM todo WHERE id = $1',
            [id]
        )
        res.json({
            msg:"Todo Deleted"
        })
        
    } catch (error) {
        res.status(500).json({
            err:error
        })
    }
})

module.exports=todoRouter