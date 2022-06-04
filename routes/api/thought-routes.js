const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// set up GET all thoughts, add thought at /api/thoughts
router
    .route("/")
    .get(getAllThoughts)
    .post(addThought)

// set up GET one thought, add thought at /api/thoughts/id
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// set up POST reaction at api/thoughts/thoughts:id/reactions
router
    .route("/:thoughtId/reactions")
    .post(addReaction)

// set up DELETE reaction at api/thoughts/thought:id/reactions/:reactionId

router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(removeReaction)

module.exports = router;