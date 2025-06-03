import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    day : {type : Date , default : Date.now},
    comment : {type : String , require : true},
    userId : {type :mongoose.Schema.Types.ObjectId , ref : 'User' , require: true },
    photoId : {type : mongoose.Schema.Types.ObjectId , ref : 'Photo' , require : true},
})

const Comment = mongoose.model('Comment' , commentSchema );
export default Comment;