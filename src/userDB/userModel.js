import userSchema from "./userSchema.js";

export const pushUser = (user) => {
  return userSchema(user).save();
};

export const findEmailExist = (email) => {
  return userSchema.findOne(email);
};
export const updateById = ({ _id, ...rest }) => {
  return userSchema.findAndUpdateById(_id, rest);
};

export const deleteById = (_id) => {
  return userSchema.findAndUpdateById(_id);
};
export const updateActivation = (target, data) => {
  return userSchema.findOneAndUpdate(target, data, { new: true });
};
