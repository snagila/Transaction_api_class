import userSchema from "../schema/userSchema.js";

// create a user
export const createUser = (userObj) => {
  return userSchema(userObj).save();
};

// find user by email
export const findUserByEmail = (email) => {
  console.log(email);
  return userSchema.findOne({ email });
};
