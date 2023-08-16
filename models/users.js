const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new Schema ({
    username: {
        type : String,
        required: [true, 'Please provide Username'],
        minLength: [5, 'Min username length is 5'],
        unique: true,
    }, 
    email:{
        type: String,
        required: [true, ' Please provid Email Address'],
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'please provid a valid email address']
    },
    password:{
        type: String,
        required: [true, 'please provide a password'],
        minLength: [7, 'min password length is 7'],
    },

},  {timestamps: true} );

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.comparePassword = async function(userPassword){
    const isCorrect = await bcrypt.compare(userPassword, this.password);
    return isCorrect;
};

userSchema.methods.generateToken = function(){
return jwt.sign({userId: this._id, email: this.email}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

module.exports = mongoose.model('User', userSchema)