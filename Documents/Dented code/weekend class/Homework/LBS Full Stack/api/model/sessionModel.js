import sessionSchema from "../schema/sessionSchema.js";

// create session token
export const createSession = (token) => {
  return sessionSchema(token).save();
};
