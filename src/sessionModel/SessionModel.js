import SessionSchema from "./SessionSchema.js";

export const storeToken = (obj) => {
  return SessionSchema(obj).save();
};
