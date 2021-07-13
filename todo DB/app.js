const express = require("express");
// const day=require(__dirname+"/date.js");
const mongoose=require("mongoose");
const app = express();
const _=require("lodash");



app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


mongoose.connect("mongodb+srv://kishore:1234@cluster0.q4gs6.mongodb.net/todolist",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

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



const listSchema={
    name:String,
    items:[itemschema]
}
const List =mongoose.model("List",listSchema);




app.get("/", function (req, res) {

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
    const listTitle=req.body.listTitle;

    const item= new Item({
        name: itemName
    });

    if(listTitle==="Today"){
        item.save();
        res.redirect("/");
        
    }
    else{
        List.findOne({name:listTitle},function(err,foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listTitle);

        })

    }
});



app.post("/delete",function(req,res){
    const checkedItemId=req.body.checkBox;
    const listTitle=req.body.listTitle;

    if(listTitle==="Today"){
        Item.findByIdAndDelete(checkedItemId,function(err){
            if(err){
                console.log("remove un-sucessfull");
            }
            else{
                console.log("remove sucessfull");
                res.redirect("/");
            }

        });
    }    
    else{
        mongoose.set('useFindAndModify', false);
        List.findOneAndUpdate({name:listTitle},{$pull:{items:{_id:checkedItemId}}},function(err,foundList){
            if(!err){
                res.redirect("/"+listTitle)
            }

        });
    }

});


app.get("/:customListName",function(req,res){
    const customListName=_.capitalize(req.params.customListName);

    List.findOne({name: customListName},function(err,foundList){
        if (!err){
            if (!foundList){
                const list= new List({
                    name: customListName,
                    items: defaultItems
            
                });
                list.save();
                res.redirect("/"+customListName);
            }
        else{
                res.render("list", {
                    listTitle: customListName,                                     
                    Lists: foundList.items
                });
            }
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;

}


app.listen(port, function () {
    console.log("server running")
});