
function login()
{
    const log1=alert("login sucessful")
}

const mongoose=require("mongoose");
const userschema= new mongoose.Schema({
    name:String,
    mail:String,
    password:String
});

