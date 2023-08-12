import userSchema from "./userSchema.js";

export const pushUser = (user) => {
  return userSchema(user).save();
};

export const findEmailExist = (email) => {
  return userSchema.findOne(email);
};
export const getOneAdmin = (filter) => {
  return userSchema.findOne(filter);
};
export const updateById = ({ _id, ...rest }) => {
  return userSchema.findByIdAndUpdate(_id, rest);
};
export const updateByEmail = (filter, object) => {
  return userSchema.findOneAndUpdate(filter, object, { new: true });
};

export const deleteById = (_id) => {
  return userSchema.findByIdAndDelete(_id);
};
export const updateActivation = (target, data) => {
  return userSchema.findOneAndUpdate(target, data, { new: true });
};
