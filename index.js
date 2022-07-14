const express = require('express')
const app = express()
const mysql = require("mysql2")
const bodyParser = require("body-parser")
const cors = require("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"curd_contact"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    // const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES('siva','siva@123.com','233334444')"
    // db.query(sqlInsert,(err,result)=>{
    //     console.log(result);
    //    res.send(result)
    // })
    res.send("hello world")
})

app.get("/api/get",(req,res)=>{
    const sqlGet = "SELECT * FROM contact_db"
    db.query(sqlGet,(error, result)=>{
        res.send(result);
    })
})


app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?"
    db.query(sqlGet, id, (error, result)=>{
        if(error)
            console.log(error)
        res.send(result);
    })
})

app.post("/api/post",(req,res)=>{
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
    db.query(sqlInsert,[name, email, contact],(error, result)=>{
        if(error){
            console.log(error);
        }
    })
})

app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate,[name, email, contact, id],(error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.delete("/api/remove/:id",(req,res)=>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove,id,(error, result)=>{
        if(error){
            console.log(error);
        }
    })
})


app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})