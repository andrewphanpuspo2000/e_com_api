import categorySchema from "./categorySchema.js";

export const addTitle = (data) => {
  return categorySchema(data).save();
};
