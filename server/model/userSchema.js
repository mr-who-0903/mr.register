const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// creating Schema
const dataSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    ph:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }
});


const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true, 
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
});



// password hashing     // this is a middleware function
// userSchema.pre('save', async function (next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12);
//         this.cpassword = await bcrypt.hash(this.cpassword, 12);
//     }
//     next();
// })

// generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let generatedToken = jwt.sign({ _id : this._id}, process.env.SECRET_KEY);   // jwt.sign(payload, secret key)
        this.tokens = this.tokens.concat({ token : generatedToken });
        this.save();
        return generatedToken;
    }
    catch(err){
        console.log(err);
    }
}


// creating collection (collection means table)
const Data = mongoose.model('data', dataSchema);    
const User = mongoose.model('user', userSchema);

module.exports = {Data, User};