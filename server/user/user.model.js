const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
    },
    nickname: {
        type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    contact: {
        email: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        }
    },
    birthdate: {
        type: Number,
        required: true,
    },
}, { timestamps: true });


module.exports = {
    Profile: mongoose.model("Profile", ProfileSchema),
}
