import Joi from "joi";

export const newAdminValidation = (req, res, next) => {
  try {
    //define the schema
    // check data againts the rule

    const schema = Joi.object({
      role: Joi.string().required(),
      fName: Joi.string().required().min(3).max(30),
      lName: Joi.string().required().min(3).max(30),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      address: Joi.string().allow(""),
      password: Joi.string().required().min(6),
    });
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
