import { verifyAccessJWT } from "../JWT/jwt.js";
import { findEmailExist } from "../userDB/userModel.js";

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
      if (user?.email && user?.status === "active") {
        user.password = undefined;
        user.refreshJWT = undefined;
        req.userInfo = user;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
