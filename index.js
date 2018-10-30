//poet=1234

const express=require('express');
var app=express();

const mongoose=require('mongoose');

var bodyparser=require('body-parser');
app.use(bodyparser.json());

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/raastaa");

////////////////////Models//////////////////////////////////////////////

var User=mongoose.model('User',{
    username:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    name:{type:String,required:true,minlenght:2,trim:true},   
    email:{type:String,required:true},
    phone:{type:String,required:true}
});

var Event=mongoose.model('Event',{
    title:{type:String,required:true},
    joinedPeople:{type:Number,required:true},
    description:{type:String},
    venue:{type:String,required:true},
    date:{type:String,required:true}
});

///////////////////////////////API////////////////////////////////////


app.post('/signup',(req,res)=>{

    console.log(req.body);
    var user=new User(
        {username:req.body.username,
            password:req.body.password,
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone}
    );
    user.save().then((data)=>{
        console.log("successfully saved",data);
        res.send(data);
        
    }, (e)=>{
        console.log("error",e);
        
    });

});

app.post('/login',(req,res)=> {
    console.log("body :",req.body);
    console.log("body_u :",req.body.username);
    var Username=req.body.username;
    User.find({username:Username}).then((data)=>{
        console.log("Result:",data[0].password);
        if(data[0].password==Username.password){
            res.send({"username":data[0].username,
            "name":data[0].name,
           "success":true});
        }
        else{
            res.send({"success":false});
        }

    },(error)=>{
        console.log(error);
    }).catch((error)=>{
        res.send(error);
    });
});


app.post('/listEvents',(req,res)=>{

});

app.get('/joinEvent',(req,res)=>{

});

app.get('/deleteEvent:event',(req,res)=>{

});

app.listen(1234);
console.log("app running on 1234");

