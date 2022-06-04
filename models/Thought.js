const { Schema, model } = require('mongoose');













  // create the Thought model using the ThoughtSchema
  const Thought = model('Thought', ThoughtSchema);

  // export the User model
  module.exports = Thought;