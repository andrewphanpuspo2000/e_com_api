import express from "express";
import slugify from "slugify";
import { addTitle } from "../categoryDB/categoryModel.js";
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
      message: "server is running",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
