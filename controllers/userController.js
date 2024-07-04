const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {
    error500,
    error409,
    error404,
    customError,
} = require("../helpers/errors");
const { success } = require("../helpers/response");
const { query } = require("express");

exports.userSignUp = async (req, res) => {
    try {
        const { password,isSocial, ...userData  } = req.body;
        if (!isSocial) {
           const {email} =req.body;
            const existingUser = await User.findOne({ email }).select("-__v -password");
            if (existingUser) {
                return res.status(409).json({
                    error: true,
                    error_msg: "User Already Exists",
                });
            } else {
                const hashedPassword = await bcryptjs.hash(password, 10);
                const user = new User({
                    ...userData,
                    password: hashedPassword,
                });
                const response = await user.save();
                success(res, "200", "Success", response);
            }
            
        } else {
            const { ...userData } = req.body;
            const existingUser = await User.findOne({ email: userData.email }).select("-__v -password");
            if (existingUser) {
                success(res, "200", "Success", existingUser);
            } else {
                const user = new User({
                    ...userData,
                    isVerified:true
                });
                const response = await user.save();

                success(res, "200", "Success", response);
            }
        }
    } catch (err) {
        error500(res, err);
    }
};
exports.userLogin = async (req, res) => {
    const { email, password, } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: true,
                error_msg: "User not found",
            });
        }if(!user.isSocial){
        const hashedPassword = user.password;
        const isPasswordValid = await bcryptjs.compare(password, hashedPassword)
        if (!isPasswordValid) {
            return res.status(401).json({
                error: true,
                error_msg: "Wrong Password",
            });
        }}
        const response = await User.findById(user._id).select("-__v -password");
        return success(res, "200", "Success", response);
    } catch (err) {
        return error500(res, err);
    }
};
exports.updateUserById = async (req, res) => {
    const decodedToken = req.user;
    const id=decodedToken.id ;
   
    try {
        const user = await User.findById(id).lean().select("-__v -password");
        if (!user) {
            return res.status(400).json({
                error: true,
                error_msg: "user not found",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        }).select("-__v -password");

        if (!updatedUser) {
            res.status(404).json({
                error: true,
                error_msg: "User not updated",
            });
        } else {
            res.status(200).json({
                error: false,
                response: updatedUser,
                success_msg: "User updated successfully",
            });
        }
    } catch (err) {
        res.status(500).json({
            error: true,
            error_msg: "Internal Server Error",
            response: err.toString(),
        });
    }
};
exports.getUserById = async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await User.findById(req.params.id).select("-__v -password")

        if (user) {
            return res.status(200).json({
                error: false,
                user: user
            });
        } else {
            return res.status(404).json({
                error: true,
                error_msg: "No Data Found",
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: true,
            error_msg: "Internal Server Error",
            response: err.toString(),
        });
    }
};
exports.getAllUser = async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await User.find().select("-__v -password")

        if (user) {
            return res.status(200).json({
                error: false,
                user: user
            });
        } else {
            return res.status(404).json({
                error: true,
                error_msg: "No Data Found",
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: true,
            error_msg: "Internal Server Error",
            response: err.toString(),
        });
    }
};
