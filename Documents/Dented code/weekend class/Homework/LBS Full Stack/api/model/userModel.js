import userSchema from "../schema/userSchema.js";

// create a user
export const createUser = (userObj) => {
  return userSchema(userObj).save();
};

// find user by email
export const findUserByEmail = (email) => {
  return userSchema.findOne({ email });
};

// update refresh token
export const updateRefreshJWT = (email, refreshJWT) => {
  return userSchema.findOneAndUpdate({ email }, { refreshJWT });
};
