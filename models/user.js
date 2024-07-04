const mongoose = require('mongoose');
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "user name is required"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email"],
        },
        role:{
            type:String,
        },
        password: {
            type: String,
        },
        isSocial:{
            type: Boolean,
            default :false
        },
        isVerified:{
            type: Boolean,
            default:false
        },
        isDeleted: {
            type: Boolean,
            default:false
        } ,
    },
    {
        timestamps: true,
    }
);
//for password
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcryptjs.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
