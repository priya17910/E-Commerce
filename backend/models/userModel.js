const mongoose = require ('mongoose');
const validator = require ('validator');
const bcryptjs = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const crypto = require ('crypto');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [
            true, "Please Enter Your Name"
        ],
        maxLength: [
            30, "Name Length Cannot Exceed 30 Characters"
        ],
        minLength: [
            4, "Name Should Have More Than 5 Characters"
        ],
    },
    email: {
        type: String,
        required: [
            true, "Please Enter Your Email ID"
        ],
        unique: true,
        validate: [
            validator.isEmail, "Please Enetr a Valid Email ID"
        ],
    },
    password: {
        type: String,
        required: [
            true, "Please Enter Your Password"
        ],
        minLength: [
            8, "Password Should Be Greater Than 8 Characters"
        ],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
            default: "avatars/x6sltu30pzxlo0nn1dhk"
        },
        url: {
            type: String,
            required: true,
            default: "https://res.cloudinary.com/dwlkegomu/image/upload/v1691909721/avatars/x6sltu30pzxlo0nn1dhk.png",
        }
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next) {

    if (!this.isModified("password"))
    {
        next();
    }
    this.password = await bcryptjs.hash (this.password, 10)
});

// JWT TOKEN
userSchema.methods.getJWTToken = function (){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing And Adding To UserSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};


module.exports = mongoose.model("User", userSchema)