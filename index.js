const express = require("express");
const { re } = require("mathjs");
const fs= require("fs")
const app =express();
const { body, validationResult } = require('express-validator');
const PORT =4000;
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.method,req.url,req.headers['user-agent']);
    let str = req.method+" "+req.url+" "+req.headers['user-agent']+"\n";
    fs.appendFileSync('./log.txt',str+"\n",{encoding:"utf-8"})
    next();
})
app.get("/posts" ,(req,res)=>{
  let data=fs.readFileSync("./Posts.json",{encoding:"utf-8"});
  res.send(data)
})

app.post("/posts/create", body('id').isNumeric(),
// password must be at least 5 chars long
body('title').isString(),body('content').isString(),body('author').isString(),(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message:"validation Failed" });
    }
    let Product = JSON.stringify(req.body);
    let file = fs.readFileSync("./Posts.json",{encoding:"utf-8"})
    //fs.appendFileSync("./Posts.json",JSON.stringify(req.body),{encoding:'utf-8'})
    parsedfile = JSON.parse(file);
    parsedfile.Students.push(req.body);
    console.log(req.body,parsedfile);
    fs.writeFileSync("./Posts.json",JSON.stringify(parsedfile),{encoding:"utf-8"})
    res.send("Thanks");
})
app.put('/posts/:id',(req,res)=>{
    let id = req.params.id;
    let file=fs.readFileSync("./Posts.json",{encoding:"utf-8"});
    parsedfile=JSON.parse(file);
    console.log(parsedfile.Students,id);
    const index = parsedfile.Students.findIndex(object => {
        return object.id == id;
      });
    parsedfile.Students[index].title=req.body.title;
    parsedfile.Students[index].content=req.body.content;
    parsedfile.Students[index].author=req.body.author;
    fs.writeFileSync("./Posts.json",JSON.stringify(parsedfile),{encoding:"utf-8"})
    res.send("Updated")
})
app.delete('/posts/:id',(req,res)=>{
    let id = req.params.id;
    let file=fs.readFileSync("./Posts.json",{encoding:"utf-8"});
    parsedfile=JSON.parse(file);
    let index=parsedfile.Students.findIndex(object=>{
       return object.id == id;
    });
    parsedfile.Students.splice(index,1);
    fs.writeFileSync("./Posts.json",{encoding:"utf-8"});
    res.send("Deleted")
})
app.listen(PORT,()=>{
    console.log(`Listening to the ${PORT}`)
})