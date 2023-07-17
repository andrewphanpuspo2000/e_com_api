import bcryptjs from "bcryptjs";

const salt = 10;
export const encryptPass = (pass) => {
  return bcryptjs.hashSync(pass, salt);
};

export const comparePass = (pass, comparison) => {
  return bcryptjs.compareSync(pass, comparison);
};
