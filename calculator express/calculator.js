const express=require("express");
const app=express();

app.use(express.urlencoded({ extended:true}));
 

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/result",function(req,res){
    var num1=Number(req.body.num1);
    var num2=Number(req.body.num2);
    var result=num1+num2;
    res.send("result:"+String(result));

});



app.listen(3000,function(){
    console.log("sever 3000");
});