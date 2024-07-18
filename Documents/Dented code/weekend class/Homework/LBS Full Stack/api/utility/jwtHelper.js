import jwt from "jsonwebtoken";
import { createSession } from "../model/sessionModel.js";
import { updateRefreshJWT } from "../model/userModel.js";

// function to generate access Token
// secret_key
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

export const generateAccessJWT = (email) => {
  try {
    const accessToken = jwt.sign({ email }, process.env.ACCESS_JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    // create a session record in database
    createSession({ token: accessToken });

    return accessToken;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to generate refresh token
const generateRefreshJWT = (email) => {
  try {
    const refreshToken = jwt.sign(
      { email },
      process.env.ACCESS_JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    // update refresh token for user
    updateRefreshJWT(email, refreshToken);

    return refreshToken;
  } catch (error) {
    console.log("error", error);
  }
};

// function to generate token
export const generateJWTs = (email) => {
  return {
    accessJWT: generateAccessJWT(email),
    refreshJWT: generateRefreshJWT(email),
  };
};

// validate accessJWT
export const verifyAccessJWT = (accessJWT) => {
  return jwt.verify(accessJWT, process.env.ACCESS_JWT_SECRET_KEY);
};

// verify refreshJWT
export const verifyRefreshJWT = (refreshJWT) => {
  return jwt.verify(refreshJWT, process.env.ACCESS_JWT_SECRET_KEY);
};
