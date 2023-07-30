import express from "express";
import {
  findEmailExist,
  pushUser,
  updateActivation,
} from "../userDB/userModel.js";
import { comparePass, encryptPass } from "../encrypt/encryptPass.js";
import {
  loginValidation,
  newAdminValidation,
} from "../validation/joiValidation.js";
import {
  accountVerificationEmail,
  confirmVerificationEmail,
} from "../nodemailer/nodemailer.js";
import { v4 as uuidv4 } from "uuid";
import { createAccessJWT, createRefreshToken } from "../JWT/jwt.js";
import { auth } from "../middleware/authMiddleware.js";

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
        const link = `${process.env.WEB_DOMAIN}/admin-verification?c=${result.verificationCode}&e=${result.email}`;
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

router.get("/", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.query;

    const data = await findEmailExist({ email });

    //find and check the user by email
    //check the password
    // create 2 jwts:
    /////create accessJWT amd storte in session table
    /////create refreshJWT amd storte in session table

    if (data?._id) {
      const passValidation = comparePass(password, data.password);
      if (passValidation) {
        const accessJWT = await createAccessJWT(email);
        const refreshJWT = await createRefreshToken(email);

        res.json({
          status: "success",
          message: "Success login",
          token: { accessJWT, refreshJWT },
        });
      }
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

router.patch("/verify", async (req, res) => {
  try {
    const { email, code } = req.body;

    const respond = await updateActivation(
      { email, verificationCode: code },
      { isVerified: true, verificationCode: "", status: "active" }
    );
    if (respond?._id) {
      await confirmVerificationEmail(respond);
      res.json({
        status: "success",
        message: "success to verify",
        user: respond,
      });
    } else {
      res.json({
        status: "error",
        message: "Link has expired",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/getUser", auth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "here is the data",
      user: req.userInfo,
    });
  } catch (err) {
    next(err);
  }
});
export default router;
