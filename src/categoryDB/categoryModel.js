import categorySchema from "./categorySchema.js";

export const addTitle = (data) => {
  return categorySchema(data).save();
};

export const getAllCategories = () => {
  return categorySchema.find();
};
