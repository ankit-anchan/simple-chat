const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    name: { type: String},
    email_id: {type: String},
    mobile_number: {type: String},
    password: {type: String},
    is_admin: { type: Number, default: 0 },
    is_active: {type: Number, default: 1},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


UserSchema.pre('save', next => {
    let now = Date.now;
    if(!this.created_at) {
        this.created_at = now;
    }
    if(!this.modified_at) {
        this.modified_at = now;
    }
    next();
});

module.exports = mongoose.model('USER', UserSchema);
