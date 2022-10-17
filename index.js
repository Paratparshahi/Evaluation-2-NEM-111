const express = require("express");
const { re } = require("mathjs");
const fs= require("fs")
const app =express();
const PORT =4000;
app.use(express.json());
app.get("/posts" ,(req,res)=>{
  let data=fs.readFileSync("./Posts.json",{encoding:"utf-8"});
  res.send(data)
})

app.post("/posts/create",(req,res)=>{
    
    fs.appendFileSync("./Posts.json",JSON.stringify(req.body),{encoding:'utf-8'})
    console.log(req.body);
    res.send("Thanks")
})
app.listen(PORT,()=>{
    console.log(`Listening to the ${PORT}`)
})