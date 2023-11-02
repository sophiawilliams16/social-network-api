const { Schema, model } = require("mongoose");
const thoughtSchema = require('./Thought');

// Schema to create User model 
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // must be valid email address
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema
    .virtual('friendCount')
    //Getter
    .get(function () {
        //console.log(this);
        return this.friends.length;
    });

// Initalize our User model 
const User = model('user', userSchema);

module.exports = User;
