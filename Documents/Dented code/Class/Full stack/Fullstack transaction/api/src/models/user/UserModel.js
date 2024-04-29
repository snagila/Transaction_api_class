import UserSchema from "./UserSchema.js";

// insert user
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};
