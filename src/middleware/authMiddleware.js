import { verifyAccessJWT } from "../JWT/jwt.js";
import { findEmailExist, getOneAdmin } from "../userDB/userModel.js";

export const auth = async (req, res, next) => {
  try {
    //1.access the access JWT
    const { authorization } = req.headers;

    //2.decode the JWT
    const decode = verifyAccessJWT(authorization);

    //3. ectract the email and get user by email
    if (decode?.email) {
      const user = await findEmailExist({ email: decode?.email });
      //4. check if user is active
      console.log(user);
      if (user?._id && user?.status === "active") {
        user.password = undefined;
        user.refreshJWT = undefined;
        req.userInfo = user;
        return next();
      }
    }
    res.json({
      status: "error",
      message: "email is not active",
    });
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      error.statusCode = 403;
      error.message = "jwt expired";
    }
    if (error.message.includes("invalid signature")) {
      error.statusCode = 401;
      error.message = error.message;
    }
    next(error);
  }
};

export const refreshAuth = async (req, res, next) => {
  //1.access the access JWT
  try {
    const { authorization } = req.headers;
    //2.decode the JWT
    const decode = verifyAccessJWT(authorization);
    //3. ectract the email and get user by email
    if (decode?.email) {
      const user = await getOneAdmin({
        email: decode.email,
        refreshJWT: authorization,
      });
    }
  } catch (err) {}
};
