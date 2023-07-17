import express from "express";
import { findEmailExist, pushUser } from "../userDB/userModel.js";
import { comparePass, encryptPass } from "../encrypt/encryptPass.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = req.body;
    user.password = encryptPass(password);
    const userValid = await findEmailExist({ email });
    console.log(userValid);
    if (!userValid?._id) {
      const result = await pushUser(user);
      if (result._id) {
        res.json({
          status: "success",
          message: "User has been added",
        });
      }
    } else {
      res.json({
        status: "error",
        message: "Email has been used",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { email, password } = req.query;

    const data = await findEmailExist({ email });

    if (data?._id) {
      const passValidation = comparePass(password, data.password);
      passValidation
        ? res.json({
            status: "success",
            message: "success to login",
          })
        : res.json({
            status: "error",
            message: "password is incorrect",
          });
    } else {
      res.json({
        status: "error",
        message: "Email is not exist",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
});
export default router;
