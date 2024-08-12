const Joi = require("joi");

const createNoteSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  body: Joi.string().min(5).required(),
});

const updateNoteSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  body: Joi.string().min(5),
});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
};
