import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
    day : {type : Date , default : Date.now},
    file_name : {type : String , require : true},
    userId : {type :mongoose.Schema.Types.ObjectId , ref : 'User' , require: true }
})

const Photo = mongoose.model('Photo' , photoSchema );
export default Photo;