import jwt from "jsonwebtoken";

// function to generate access Token
// secret_key
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

export const generateAccessJwt = (email) => {
  try {
    const accessToken = jwt.sign({ email }, process.env.ACCESS_JWT_SECRET_KEY, {
      expiresIn: "59m",
    });
    return accessToken;
  } catch (error) {
    console.log(error.message);
  }
};
