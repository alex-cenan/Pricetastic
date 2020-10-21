const mongoose = require('mongoose');
const { Schema } = mongoose;
const caterogies = require('../lib/categories');

const AnnouncementSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    description: {
        type: String,
        maxlength: 200,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    price: Number,
    category: {
      type: String,
      tolowercase: true,
      enum : caterogies,
    },
    province: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);