import UserSchema from "./UserSchema.js";

// insert user
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

// get user by email
export const getUserByEmail = (email) => {
  return UserSchema(userObj).findOne({ email });
};
