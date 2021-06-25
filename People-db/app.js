const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/peopleDB",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));;

const peopleSchema =new mongoose.Schema({
    _id:Number,
    name:{
        type: String,
        required:[true,"no name found"]
    },
    age: Number
});

const People = mongoose.model("People",peopleSchema);

const people =new People({
    _id:6,
    age:256
});


people.save();
People.find(function(err,people){
    if(err){
        console.log(err);
    }
    else{
        people.forEach(function(item){
            console.log(item.name);
        });
    }
});