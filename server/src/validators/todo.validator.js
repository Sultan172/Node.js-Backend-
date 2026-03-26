const Joi = require('joi');

exports.createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
});

exports.updateTodoSchema = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
});
