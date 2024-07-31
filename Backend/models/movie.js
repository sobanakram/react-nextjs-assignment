const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        default: null
    },
    publishYear: {
        type: String,
        required: true
    },
    poster: {
        url: {
            type: String,
            default: null
        },
        contentType: {
            type: String,
            default: null
        },
        fileName: {
            type: String,
            default: null
        }
    }
},
    {
        timestamps: { createdAt: true, updatedAt: true },
    });

const movie = mongoose.model('movie', movieSchema);
module.exports = movie;
