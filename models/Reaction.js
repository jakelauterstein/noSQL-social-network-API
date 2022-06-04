const { Schema, model } = require('mongoose');

















  // create the Pizza model using the PizzaSchema
  const Reaction = model('Reaction', ReactionSchema);

  // export the User model
  module.exports = Reaction;