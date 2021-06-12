const express = require("express");
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
    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    day = today.toLocaleDateString('en-us', options);

    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    // }
    res.render("list", {
        listTitle: day,
        List: taskList
    });
});



app.post("/", function (req, res) {
    if (req.body.button === "Work") {
        newItem = req.body.newItem;
        workList.push(newItem);
        res.redirect("/work")
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

app.post("/work", function (req, res) {
    newItem = req.body.newItem;
    workList.push(newItem);
    res.redirect("/work");
});

app.listen(3000, function () {
    console.log("server running on port 3000.")
});