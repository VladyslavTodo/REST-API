const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Set password for user"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: emailRegexp,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        token: String,
        avatarURL: String,
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};
