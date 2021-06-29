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






let taskList = []
let workList = [];
var newItem = "";
app.get("/", function (req, res) {
    console.log(taskList,workList);

    Item.find({},function(err,founditems){
        if(founditems.length===0){
            Item.insertMany(defaultItems,function(err){
                if(err){
                    console.log(err);
                }
                else{
                console.log("saved default items");
                }
            });  
        res.redirect("/")
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
    const itemName=req.body.newItem;
    const item= new Item({
        name: itemName
    });
    item.save();
    res.redirect("/");
});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work",
        List: workList
    });
});

app.post("/delete",function(req,res){
    const checkedItemId=req.body.checkBox;
    Item.findByIdAndRemove(checkedItemId,function(err){
        if(err){
            console.log("remove un-sucessfull");
        }
        else{
            console.log("remove sucessfull");
        }
    });
    res.redirect("/");

});


app.get("/:customListName",function(req,res){
    const customListName=req.params.customListName;
    console.log(customListName);
})


app.listen(3000, function () {
    console.log("server running on port 3000.")
});