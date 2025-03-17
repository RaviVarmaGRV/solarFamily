const express=require('express');
const app=express();
const path=require('path');
const pubDir=path.join(__dirname,"/public");
const fs=require('fs');
const filePath="./public/data.json";

app.use(express.static(pubDir));
app.use(express.json());
app.set("view engine", "ejs");

var datas;

fs.readFile(filePath,'utf8',(err,data)=>{
    if (err) {
        console.log('Sorry an error occured',err);
    }
    else{
        datas=JSON.parse(data);
    }
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/planets/:id',(req,res)=>{
    res.send(datas[+(req.params.id)-1]);
    
})

app.listen('3002',()=>{
    console.log('Port 3002 connected');  
})

