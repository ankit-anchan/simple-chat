const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    message_type: {type: String, required: true, default: 'text'},
    message: {type: String},
    media_url: {type: String},
    content_type: {type: String},
    room: {type: Schema.Types.ObjectId, ref: 'ROOM'},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

MessageSchema.pre('save', next => {
    let now = Date.now;
    if(!this.created_at) {
        this.created_at = now;
    }
    if(!this.modified_at) {
        this.modified_at = now;
    }
    next();
});


module.exports = mongoose.model('MESSAGE', MessageSchema);
