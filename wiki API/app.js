const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));


mongoose.connect("mongodb+srv://kishore:1234@cluster0.q4gs6.mongodb.net/wikiDB", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

////////////////////////////////////////request targetting all articles///////////////

app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (!err) {
                console.log(foundArticles);
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save();
    })
    .delete(function () {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("deleted all articles")
            } else {
                res.send(err);
            }
        })

    });

    ///////////////////////////////////////request targetting specicic articles///////////////
app.route("/articles/:articleTitle")

.get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
        if(!err){
           res.send(foundArticle); 
        }
        else{
            res.send("no articles found");
        }
    })
})

app.listen(3000, function () {
    console.log("server is up and running");
})