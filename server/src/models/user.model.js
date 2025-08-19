import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique: true,
    },

    fullName:{
        type : String,
        required : true,
    },

    password :{
        type : String,
        required : true,
    },
    profileImageURL:{
        type:String,
        default:null
    }

},{
    timestamps: true,
}

);

userSchema.pre("save",async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function (inputPassword){
    return await bcrypt.compare(inputPassword, this.password);

}
const User = mongoose.model("User",userSchema);
export default User;
