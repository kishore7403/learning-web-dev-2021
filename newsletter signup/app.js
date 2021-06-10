const express=require("express");
const app=express();
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.listen(3000,function(){
    console.log("sevrer is running on port 3000");
})