const express =require("express");
const mongoose=require("mongoose");
const app=express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://kishore:1234@cluster0.q4gs6.mongodb.net/wikiDB",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

const articleSchema={
    title:String,
    content:String
};

const Article=mongoose.model("Article",articleSchema);


app.get("/articles",function(req,res){
    Article.find(function(err,foundArticles){
        if(!err){
            console.log(foundArticles);
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }
    });
});

app.post("/articles",function(req,res){

    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    })
    newArticle.save();
});

app.delete("/articles",function(){
    Article.deleteMany(function(err){
        if(!err){
            res.send("deleted all articles")
        }
        else{
            res.send(err);
        }
    })

})
app.listen(3000,function(){
    console.log("server is up and running");
})