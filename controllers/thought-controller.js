const { Thought, User } = require('../models')

const thoughtController = {
  //get all thoughts
    getAllThoughts(req, res) {
      Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

     // get one thought by id
     getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
        .select('-__v')
        .then(dbThoughtData => {
          // If no thought is found, send 404
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    //add thought to User
    addThought({ body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ username, _id }) => {
            return User.findOneAndUpdate(
              { username: username },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id, adding thought with no user now!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

        // update thought by id
        updateThought({ body, params }, res) {
          Thought.findOneAndUpdate({_id: params.id}, body, { 
            new: true, runValidators: true})
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
          },

      // delete Thought
      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(({ username }) => {
                return User.findOneAndUpdate(
                    { username: username },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return;
                }

                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },


    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
      // remove reaction
      removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
        }
}

module.exports = thoughtController;


