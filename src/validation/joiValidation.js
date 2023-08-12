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

export const updateCatValidation = (req, res, next) => {
  try {
    //define the schema
    // check data againts the rule

    const schema = Joi.object({
      _id: Joi.string().required(),
      title: Joi.string().required(),
      slug: Joi.string().required(),
      status: Joi.string().required(),
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
export const loginValidation = (req, res, next) => {
  try {
    //define the schema
    // check data againts the rule

    const schema = Joi.object({
      email: Joi.string().required().email({ minDomainSegments: 2 }),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.query);

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
export const newPaymentOptionValidation = (req, res, next) => {
  try {
    //define the schema
    // check data againts the rule

    const schema = Joi.object({
      status: Joi.string().required(),
      option: Joi.string().required(),
      description: Joi.string().required(),
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
export const newProductValidation = (req, res, next) => {
  try {
    //define the schema
    // check data againts the rule

    const schema = Joi.object({
      status: Joi.string().required(),
      name: Joi.string().required(),
      sku: Joi.string().required(),
      price: Joi.number().required(),
      qty: Joi.number().required(),
      salesPrice: Joi.number().required(),
      salesStart: Joi.string().required().allow("", null),
      salesEnd: Joi.string().required().allow("", null),
      description: Joi.string().required(),
      parentCat: Joi.string().required(),
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
