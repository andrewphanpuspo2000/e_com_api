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
export const updateProductValidation = (req, res, next) => {
  try {
    //define the schema
    // check data againts the rule
    req.body.salesStart =
      req.body.salesStart === "null" || !req.body.salesStart
        ? null
        : req.body.salesStart;

    req.body.salesEnd =
      req.body.salesEnd === "null" || !req.body.salesEnd
        ? null
        : req.body.salesEnd;

    const schema = Joi.object({
      status: Joi.string().required(),
      name: Joi.string().required(),
      _id: Joi.string().required(),

      price: Joi.number().required(),
      qty: Joi.number().required(),
      sku: Joi.string().required(),
      salesPrice: Joi.number().required(),
      salesStart: Joi.string().required().allow("", null),
      salesEnd: Joi.string().required().allow("", null),
      description: Joi.string().required(),
      parentCat: Joi.string().required(),
      images: Joi.string().allow(""),
      thumbnail: Joi.string().allow(""),
    });

    const { error } = schema.validate(req.body);
    console.log("req.images split :", req.body.images);
    req.body.images = req.body.images.split(",");
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

export const updateProfileValidation = (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      _id: Joi.string().required(),
      status: Joi.string().required(),
      verificationCode: Joi.string().required(),
      isVerified: Joi.boolean().required(),
      createdAt: Joi.string().required(),
      updatedAt: Joi.string().required(),
      __v: Joi.string().required(),
      role: Joi.string().required(),
      fName: Joi.string().required().min(3).max(30),
      lName: Joi.string().required().min(3).max(30),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      address: Joi.string().allow(""),
      validationPassword: Joi.string().required().min(6),
      image: Joi.string().allow(""),
    });

    const { ...rest } = req.body;
    console.log("this is joi body:", rest);
    const { error } = schema.validate(rest);

    error
      ? res.json({
          status: "error",
          message: "joi:" + error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const newPasswordValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      newPassword: Joi.string().min(6).required(),
      currentPassword: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (err) {
    next(err);
  }
};
