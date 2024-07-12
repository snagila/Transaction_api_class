import bcrypt from "bcryptjs";

const salt = 15;

export const hashPassword = (plainpassword) => {
  const hashPassword = bcrypt.hashSync(plainpassword, salt);
  return hashPassword;
};

export const comparePassword = (plainpassword, hashPassword) => {
  return bcrypt.compareSync(plainpassword, hashPassword);
};
