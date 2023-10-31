const { Schema, Types } = require("mongoose");

// Schema to create Reaction 
const reactionSchema = new Schema({
    // default value set to a new ObjectID
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    // use getter to format timestamp
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = reactionSchema;
