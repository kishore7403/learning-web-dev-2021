const express=require("express");
const https=require("https");
const app=express();
app.use(express.urlencoded({ extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    
    const city=req.body.cityName;
    const apiKey="f983ddf08ebfbf4bea08946389df1d0b";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
    
    https.get(url,function(response){
        console.log(response);
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temperature=weatherdata.main.temp;
            const icon=weatherdata.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const weatherdescription=weatherdata.weather[0].description;
            console.log(weatherdata);
            res.write("<h1>temperature in "+city+" is "+temperature+"</h1>");
            res.write("<h1>Description:"+weatherdescription+"</h1>");
            res.write("<img src="+imageurl+">");
            res.send()
        })
    })

});




app.listen(3000,function(){
    console.log("server is running on port 3000.");
})