const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

// Schema to create Thought model 
const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    // use getter to format timestamp 
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // the user that created this thought
    username: {
        type: String,
        required: true,
        },
    // this line creates subdocument 'reactionSchema' 
    reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        //return this.reactions.length;
        console.log(this);
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
