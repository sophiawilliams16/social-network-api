const { Thought } = require("../models");

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
            console.log(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId,
            });
            res.json(thought);
            console.log(thought);

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought with that ID" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST create new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // PUT update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                // Validators: use validations before you update
                // New: return newly updated version
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought with that ID" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE thought by id and associated reactions
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId,
            });

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought with that ID" });
            }

            // await Reaction.deleteMany({ _id: { $in: thoughts.reaction } });
            // res.json({ message: "Thoughts and reactions deleted " });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // POST create new reaction
    async addReaction(req, res) {
        console.log("You are adding a reaction");
        console.log(req.body);

        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought found with that ID :(" });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // DELETE reaction
};
