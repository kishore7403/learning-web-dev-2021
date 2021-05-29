//jshint esversio:6
const express=require("express");
const app=express();

app.get("/",function(req,res){

    res.send("Hello");

});

app.get("/contact",function(req,res){

    res.send("Hello contact me at kishore7403@gmail.com");

});

app.get("/about",function(req,res){

    res.send("Hello its me at kishore");

});

app.get("/hobbies",function(req,res){

    res.send("memes");

});


app.listen(3000,function(){
    console.log("sever 3000")
});