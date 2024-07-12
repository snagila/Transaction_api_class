import Joi from "joi";
import { buildErrorResponse } from "../utility/responseHelper.js";

export const newUserValidation = (req, res, next) => {
  try {
    // define joi schema for server side validation
    const schema = Joi.object({
      first_name: Joi.string().min(3).required(),
      last_name: Joi.string().min(3).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      buildErrorResponse(res, error.message);
      return;
    }
    next();
  } catch (error) {
    console.log("Error", error.message);
  }
};
