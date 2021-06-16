const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    body:{
        required:true,
        type:String
    },
    photo:{
        data: Buffer, 
        contenType:String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema);