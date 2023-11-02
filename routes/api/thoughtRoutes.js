const router = require("express").Router();

// Importing the functions from user controllers
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction
} = require("../../controllers/thoughtController");

// Define which functions run based on the URL
//   /api/thoughts
router.route("/").get(getThoughts).post(createThought);

//   /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

//   /api/thoughts/:thoughtId/reactions
router.route("/:thoughtid/reactions/:userId").post(addReaction);

//   /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtid/reactions/:reactionId").delete();

module.exports = router;
