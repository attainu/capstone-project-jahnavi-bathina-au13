const mongoose = require('mongoose');
var uuidv1 = require('uuidv1');
const crypto = require("crypto");
const {ObjectId} = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
      
    },
    hashed_password:{
        type:String,
        required:true

    },
    salt:String,
    create:{
        type:Date,
        default:Date.now
    },
    updated: Date,
    photo:{
        data: Buffer,
        contentType :String
    },
    about:{
        type:String,
        trim:true
    },
    following:[{type:ObjectId ,ref :"User"}],
    followers:[{type:ObjectId ,ref :"User"}]
})
//virtual fields and Methods for HashedPassword.
UserSchema.virtual('password')
.set(function(password){
    // creates a temporary vraible called _password
    this._password = password
    // generate a timestamp usig ("UUIDv1")
    this.salt =uuidv1(); 
    //encryptedPassword()
    this.hashed_password= this.encryptPassword(password)
})
.get(function(){
    return this._password
})

//methods(Encryption Password Method here the whole process is held for giving a hashedPassword.)
// the user is trying to login for first time.
UserSchema.methods= {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password 
    },
    //this authentication is done for sigin process and the plainText is given by user while sigining. and 
    // checks whether it is matched with hashed_password that was saved in database.

    encryptPassword:function(password){
        if(!password) return "";
        try {
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }catch (err){
            return "";

        }
    }
}
module.exports = mongoose.model('User', UserSchema); 