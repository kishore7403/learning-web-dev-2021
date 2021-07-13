

const express = require("express");
const mongoose=require("mongoose");
const app = express();
const _ = require("lodash");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect("mongodb+srv://kishore:1234@cluster0.q4gs6.mongodb.net/blogSite",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

const blogschema=new mongoose.Schema({
    title:String,
    content:String
});

const blogitem= mongoose.model("blogitem",blogschema);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts=[];
blogitem.find(function(err,data){
  if(!err){
    posts=data;
  }
  
})


app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});



app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});


app.get("/compose", function (req, res) {
  res.render("compose");
});


app.post("/compose", function (req, res) {

  let postTitle = _.lowerCase(req.body.composeTitle);
  let postContent = _.lowerCase(req.body.composeContent);
  const blogContent=new blogitem({
    title:postTitle,
    content:postContent    
    
  });
  blogContent.save();

  posts.push({
    title: postTitle,
    content: postContent
  });
  res.redirect("/");
});


app.get('/posts/:postName', function (req, res) {
  let requestedPost = _.lowerCase(req.params.postName);
  console.log(requestedPost);
  blogitem.findOne({title: requestedPost},function(err,data){
    if(!err){
      console.log(data.title);
      res.render("post",{title: data.title,content: data.content});
    }
    
  })
});




app.listen(3000, function () {
  console.log("Server started on port 3000");
});