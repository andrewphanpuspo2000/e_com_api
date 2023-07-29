import jwt from "jsonwebtoken";
import { storeToken } from "../sessionModel/SessionModel.js";
import { updateByEmail } from "../userDB/userModel.js";

export const createAccessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1m",
  });
  await storeToken({ token, associate: email });
  return token;
};

export const createRefreshToken = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  const updateAdmin = await updateByEmail({ email }, { refreshJWT });
  console.log(updateAdmin);
  return refreshJWT;
};
