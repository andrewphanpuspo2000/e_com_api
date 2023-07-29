import express from "express";
import slugify from "slugify";
import {
  addTitle,
  getAllCategories,
  updateCatModel,
} from "../categoryDB/categoryModel.js";
import { updateCatValidation } from "../validation/joiValidation.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    const obj = {
      title,
      slug: slugify(title, { trim: true, lower: false }),
    };

    const result = await addTitle(obj);
    res.json({
      status: "success",
      message: "data has been inputted",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllCategories();

    if (result?.length) {
      res.json({
        status: "success",
        message: "data has been retrieved",
        result,
      });
    }
  } catch (error) {
    next(error);
  }
});
router.put("/", async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    const result = await updateCatModel(_id, rest);

    if (result?._id) {
      res.json({
        status: "success",
        message: "data has been updated",
      });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
