const express=require("express");
const app=express();

app.use(express.urlencoded({ extended:true}));
 

app.get("/",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/bmiCalculator",function(req,res){
    var height=Number(req.body.num1);
    var weight=Number(req.body.num2);
    var result=weight/(height*height);
    res.send("result:"+String(result));

});

app.listen(3000,function(){
    console.log("sever 3000");
});