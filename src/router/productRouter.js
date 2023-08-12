import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../validation/joiValidation.js";
import {
  addProduct,
  deleteProductById,
  getAllProduct,
} from "../productDB/productModel.js";
import multer from "multer";
import path from "path";
const router = express.Router();
const targetFolder = "/public/img/product";
//setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const error = null;
    //validation check
    cb(error, targetFolder);
  },
});

router.post("/", newProductValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, { trim: true, lower: true });
    const result = await addProduct(req.body);

    if (result?._id) {
      res.json({
        status: "success",
        message: "Product has been added",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = await getAllProduct();
    if (data?.length) {
      res.json({
        status: "success",
        message: "Products has been retrieved",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductById(id);
    if (result?._id) {
      res.json({
        status: "success",
        message: "Product has been deleted",
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
