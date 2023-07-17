import userSchema from "./userSchema.js";

export const pushUser = (user) => {
  return userSchema(user).save();
};

export const findEmailExist = (email) => {
  return userSchema.findOne(email);
};
