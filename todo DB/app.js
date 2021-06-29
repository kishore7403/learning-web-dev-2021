const express = require("express");
// const day=require(__dirname+"/date.js");
const mongoose=require("mongoose");
const app = express();



app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


mongoose.connect("mongodb://localhost:27017/todolist",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));;

const itemschema=new mongoose.Schema({
    name:String
});

const Item= mongoose.model("Item",itemschema);

const item1=new Item({
    name:"welcome"
    
});

const item2=new Item({
    name:"hello"
    
});

const item3=new Item({
    name:"bye"
    
});

const defaultItems=[item1,item2,item3];

Item.insertMany(defaultItems,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Sucess")
    }
})




let taskList = []
let workList = [];
var newItem = "";
app.get("/", function (req, res) {
    console.log(taskList,workList);

    Item.find(function(err,founditems){
        if(err){
            console.log(err);
        }
        else{
            res.render("list", {
                listTitle: "Today",                                      //pass day() instead of "Today" for date.
                Lists: founditems
            });
        }
    });
    
    
    
    

    
});



app.post("/", function (req, res) {
    if (req.body.button === "Work") {
        newItem = req.body.newItem;
        workList.push(newItem);
        res.redirect("/work");
    } else {

        newItem = req.body.newItem;
        taskList.push(newItem);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work",
        List: workList
    });
});



app.listen(3000, function () {
    console.log("server running on port 3000.")
});