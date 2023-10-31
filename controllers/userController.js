// ObjectId() method for converting studentId string into an ObjectId for querying database
//const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
    // GET all users 
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
            console.log(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET user by ID 
    async getSingleUser(req, res) {
         try {
             const user = await User.findOne({ _id: req.params.userId });
             res.json(user);
             console.log(user);

             if (!user) {
                 return res
                     .status(404)
                     .json({ message: "No user with that ID" });
             }

         } catch (err) {
             console.log(err);
             res.status(500).json(err);
         }
    },

    // POST create new user 
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // PUT update to user by ID
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                // Validators: use validations before you update 
                // New: return newly updated version 
                { runValidators: true, new: true },
            );

             if (!user) {
                 return res
                     .status(404)
                     .json({ message: "No user with that ID" });
             }
            
            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE user by Id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with that ID" });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted ' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST new friend to user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: { friends: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with that ID" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    
    // DELETE friend from user's friend list 


}


