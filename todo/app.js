const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
var item = []
app.get("/", function (req, res) {
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
    res.render("list", { day: day, item: item });
});



app.post("/", function (req, res) {
    var newitem = req.body.newItem;
    item.push(newitem);
    res.redirect("/");
});


app.listen(3000, function () {
    console.log("server running on port 3000.")
});
