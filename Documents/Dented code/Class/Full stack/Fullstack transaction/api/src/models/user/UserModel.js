import UserSchema from "./UserSchema.js";

// insert user
export const insertUser = (userObj) => {
  console.log(userObj);
  return UserSchema(userObj).save();
};
