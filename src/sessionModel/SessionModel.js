import SessionSchema from "./SessionSchema.js";

export const storeToken = (obj) => {
  return SessionSchema(obj).save();
};
export const deleteSessionToken = (token) => {
  return SessionSchema.findOneAndDelete({ token });
};

export const deleteSessionByFilter = (obj) => {
  return SessionSchema.findOneAndDelete(obj);
};
