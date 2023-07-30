import SessionSchema from "./SessionSchema.js";

export const storeToken = (obj) => {
  return SessionSchema(obj).save();
};
export const deleteSessionToken = (obj) => {
  return SessionSchema.findOneAndDelete(obj);
};
