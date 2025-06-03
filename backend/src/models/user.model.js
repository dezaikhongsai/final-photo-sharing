import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username : {type : String , required : true , unique : true , trim : true},
    password : {type : String , required : true},
    first_name : {type : String , required : true},
    last_name : {type : String , required : true},
    location : {type : String , required : true},
    description: {type : String , required : true},
    occupation: {type : String , required : true}
});

const User = mongoose.model('User' , userSchema);
export default User;