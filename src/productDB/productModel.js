import productSchema from "./productSchema.js";

export const addProduct = (obj) => {
  return productSchema(obj).save();
};
export const getAllProduct = () => {
  return productSchema.find();
};
export const getProductById = (id) => {
  return productSchema.findById(id);
};
export const editByIdProduct = (id, edit) => {
  return productSchema.findByIdAndUpdate(id, edit);
};
export const editByFilter = (filter, edit) => {
  return productSchema.findOneAndUpdate(filter, edit, { new: true });
};

export const deleteProductById = (id) => {
  return productSchema.findByIdAndDelete(id);
};
