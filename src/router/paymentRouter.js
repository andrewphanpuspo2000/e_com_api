import express from "express";
import {
  addPaymentMethod,
  deleteOption,
  getPaymentMethods,
  updateOption,
} from "../paymentOptionDB/paymentModel.js";
import { newPaymentOptionValidation } from "../validation/joiValidation.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await getPaymentMethods();
    res.json({
      status: "success",
      collection: data,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", newPaymentOptionValidation, async (req, res, next) => {
  try {
    const { status, option, description } = req.body;
    const result = await addPaymentMethod({ status, option, description });
    if (result?._id) {
      res.json({
        status: "success",
        message: "payment method has been added",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { id, ...rest } = req.body;
    const result = await updateOption(id, rest);
    if (result?._id) {
      res.json({
        status: "success",
        message: "Payment has been updated",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteOption(id);
    if (result?._id) {
      res.json({
        status: "success",
        message: "Payment method has been deleted",
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
