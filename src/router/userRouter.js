import express from "express";
import { findEmailExist, pushUser } from "../userDB/userModel.js";
import { comparePass, encryptPass } from "../encrypt/encryptPass.js";
import { newAdminValidation } from "../validation/joiValidation.js";
import { accountVerificationEmail } from "../nodemailer/nodemailer.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = req.body;
    user.password = encryptPass(password);
    user.verificationCode = uuidv4(); //create unique id
    const userValid = await findEmailExist({ email });

    console.log(userValid);
    if (!userValid?._id) {
      const result = await pushUser(user);
      if (result?._id) {
        const link = `${process.env.WEB_DOMAIN}/admin-verificaton?c=${result.verificationCode}&e=${result.email}`;
        await accountVerificationEmail({
          fName: result.fName,
          email: result.email,
          link,
        });
        return res.json({
          status: "success",
          message: "Please check your email to activate you account",
        });
      }

      res.json({
        status: "error",
        message: "unable to crate account",
      });
    } else {
      res.json({
        status: "error",
        message: "Unable to add new Admin",
      });
    }
  } catch (err) {
    err.statusCode = 400;
    const msg = err.message;
    if (msg.includes("E11000 duplicate key error")) {
      err.message =
        "This email is already used by another admin, use different email or reset your password";
    }
    next(err);

    // res.json({
    //   status: "error",
    //   message: err.message,
    // });
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
            user: data,
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
