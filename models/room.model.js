const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    is_group: {type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    members: [{type: Schema.Types.ObjectId, ref: 'USER'}]
});

RoomSchema.pre('save', next => {
    let now = Date.now;
    if(!this.created_at) {
        this.created_at = now;
    }
    if(!this.modified_at) {
        this.modified_at = now;
    }
    next();
});

module.exports = mongoose.model('ROOM', RoomSchema);
