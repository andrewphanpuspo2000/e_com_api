import categorySchema from "./categorySchema.js";

export const addTitle = (data) => {
  return categorySchema(data).save();
};

export const getAllCategories = () => {
  return categorySchema.find();
};
export const updateCatModel = (id, obj) => {
  return categorySchema.findByIdAndUpdate(id, obj);
};
export const deleteCatModel = (id) => {
  return categorySchema.findByIdAndDelete(id);
};
