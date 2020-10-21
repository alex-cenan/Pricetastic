const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 50
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 100
    },
    phone: {
        type: Number,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.encryptPassword = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    return hashedPassword;
};

UserSchema.methods.checkPassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);

    if(match) return true;

    return false;
}

module.exports = mongoose.model('User', UserSchema);
