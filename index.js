// Task1: initiate app and run server at 3000
// app.js

const express = require('express');
const bodyparser=require('body-parser');
const bcrpt=require('bcrypt')
const jwt=require('jsonwebtoken')
var app=new express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
const cors=require('cors');
app.use(cors());
const mongoose=require('mongoose');



mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://Ajala2508:25081995@cluster0.dvt9htp.mongodb.net/emp?retryWrites=true&w=majority',
{
    useNewUrlParser:true
});

const UserModel = require("./model/users_model");
const EmployeeModel = require("./model/employee_model");

app.post('/create',(req,res)=>{

    jwt.verify(req.body.token,"myKey",(err,decoded)=>{
        if(decoded && decoded.username){
            let data = new EmployeeModel({
                name:req.body.name,
                position:req.body.position,
                location:req.body.location,
                salary:req.body.salary,

            })
            data.save()
            res.json({"status":"success",data})
            console.log(data);
        }
        else{
            res.json({"status":"Failed... Unuthorized User...!"})
        }
    })
   
})
app.post('/logincheck',(req,res)=>{

    jwt.verify(req.body.token,"myKey",(err,decoded)=>{
        if(decoded && decoded.username){
            res.json({"status":"success"})
        }
        else{
            res.json({"status":"Unauthorised user"})
    
        }
       })
    })
app.get('/',async(req,res)=>{
try
{
  const data=await EmployeeModel.find()
  res.json(data);
}
catch(err)
{
    res.status(400).json({error:"No employee to display"});
}  
})

app.put('/update/:id',async(req,res)=>{
  try {
    let id=req.params.id;
const data= await EmployeeModel.findOneAndUpdate({"_id":id},req.body)
res.json({"status":"success"})
}
catch (error)
{
    res.status(400).json({error:"No employee updated"});
}
   
})

app.delete('/delete/:id',async(req,res)=>{           
    try
    {
        let id=req.params.id;
       const data= await EmployeeModel.findOneAndDelete({"_id":id},req.body);
       res.json({"status":"success"})
    }
    catch (error)
    {
        res.status(400).json({error:"No employee deleted"});
    }
   
})


app.post("/signup",async(req,res)=>{

    const user = await UserModel.create(req.body);

    res.status(200).json({
        success:true,
        user
    });
    console.log(user);
})

app.post("/signin",async(req,res)=>{
    var username=req.body.username
    var password=req.body.password

    let result=UserModel.find({username:username},(err,data)=>{

        if(data.length>0){
            const passwordValidator=bcrpt.compareSync(password,data[0].password)
            if(passwordValidator){

                jwt.sign({username:username,id:data[0]._id},"myKey",{expiresIn:"1d"},
                (err,token)=>{
                    if (err) {
                        res.json({"status":"error","error":err})

                    } else {
                        res.json({"status":"success","data":data,"token":token})
                    }
                })            
            }
            else{
                res.json({"status":"failed","data":"invalid password"})
            }
        }
        else{
            res.json({"status":"failed","data":"invalid email id"})
        }
    })
})

//Running server at port 8082
app.listen(8082,()=>
{
    console.log("Server listening to port 8082");
}
)
