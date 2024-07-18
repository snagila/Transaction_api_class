import sessionSchema from "../schema/sessionSchema.js";

// create session token
export const createSession = (token) => {
  return sessionSchema(token).save();
};

//
export const getSession = (token) => {
  return sessionSchema.findOne({ token });
};

// deletesession
export const deletesession = (accessJWT) => {
  return sessionSchema.findOneAndDelete({ token: accessJWT });
};
