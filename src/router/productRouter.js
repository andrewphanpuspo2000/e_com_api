import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../validation/joiValidation.js";
import {
  addProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
} from "../productDB/productModel.js";
import multer from "multer";

const router = express.Router();
const targetFolder = "src/public/img/product";

//setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const error = null;
    //validation check
    cb(error, targetFolder);
  },
  filename: (req, file, cb) => {
    const error = null;
    const fileName = Date.now() + "-" + file.originalname;
    cb(error, fileName);
  },
});

const upload = multer({ storage });
router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      console.log(req.files);
      if (req?.files?.length) {
        req.body.images = req.files.map((item) => item.path);
        req.body.thumbnail = req.body.images[0];
      }
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
  }
);

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

router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = await getProductById(_id);
    if (product?._id) {
      res.json({
        status: "success",
        product,
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
