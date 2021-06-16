const express = require("express");
const day=require(__dirname+"/date.js");
const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
let taskList = []
let workList = [];
var newItem = "";
app.get("/", function (req, res) {
    console.log(taskList,workList);
    

    res.render("list", {
        listTitle: day(),
        List: taskList
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