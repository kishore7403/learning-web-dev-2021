const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/peopleDB",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));;


const fruitSchema =new mongoose.Schema({
    name:{
        type: String,
        required:[true,"no name found"]
    }
});
const peopleSchema =new mongoose.Schema({
    _id:Number,
    name:{
        type: String,
        required:[true,"no name found"]
    },
    age: Number,
    favfruit: fruitSchema
});



const People = mongoose.model("People",peopleSchema);
const Fruit=mongoose.model("Fruit",fruitSchema)

const mango=new Fruit({
    name:"mango"
    
});

// const people =new People({
//     _id:8,
//     name:"felix",
//     age:256,
//     favfruit:peach
// });


mango.save();
// people.save();





// people.save();
// People.find(function(err,people){
//     if(err){
//         console.log(err);
//     }
//     else{
//         people.forEach(function(item){
//             console.log(item.name);
//         });
//     }
// });

// People.deleteOne({_id:4},function(err){
//     if(err){
//          console.log(err);
//          }
//     else{
//         console.log("update sucessfull");
//     }
// });

People.updateOne({_id:1},{favfruit:mango},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("update sucessfull");
    }
})