const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const { constants } = require('../shared/contants');

const userSchema = new Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    jwt: {
        type: String,
        default: null
    }
},
    {
        timestamps: { createdAt: true, updatedAt: true },
    });

userSchema.pre('save', async function (next) {
    try {
        if (this.password) {
            if (!constants.PASSWORD_REGEX.test(this.password)) {
                next(
                    'Password must contain at least 8 characters, 1 uppercase letter and 1 special character!'
                );
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const user = mongoose.model('user', userSchema);
module.exports = user;
