import paymentSchema from "./paymentSchema.js";

export const addPaymentMethod = (method) => {
  return paymentSchema(method).save();
};
export const getPaymentMethods = () => {
  return paymentSchema.find();
};

export const updateOption = (id, data) => {
  return paymentSchema.findByIdAndUpdate(id, data);
};

export const deleteOption = (id) => {
  return paymentSchema.findByIdAndDelete(id);
};
