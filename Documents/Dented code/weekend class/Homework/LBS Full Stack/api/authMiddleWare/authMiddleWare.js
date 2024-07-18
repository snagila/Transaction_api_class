import { getSession } from "../model/sessionModel.js";
import { findUserByEmail } from "../model/userModel.js";
import {
  generateAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../utility/jwtHelper.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const getUserFromAccessJWT = async (accessJWT) => {
  // check if the token exists in the sessionStorage
  const token = await getSession(accessJWT);
  if (!token?._id) {
    return false;
  }

  //   validate accessJWT
  const decodedToken = verifyAccessJWT(accessJWT);
  if (!decodedToken.email) {
    return false;
  }
  //   token is valid get the user from decoded email
  const user = await findUserByEmail(decodedToken.email);
  return user;
};

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization);
    const accessJWT = authorization;

    //   find user based on the authorization token
    const user = await getUserFromAccessJWT(accessJWT);

    if (user._id) {
      user.password = undefined;
      req.userInfo = user;
      next();
      return;
    }
    buildErrorResponse(res, "invalid token, unauthorized NA");
  } catch (error) {
    buildErrorResponse(res, "invalid token, unauthorized NA");
  }
};

// auth to auth refreshtoken
export const refreshAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // validate and decode refresh token
    const decodedToken = verifyRefreshJWT(authorization);

    if (decodedToken?.email) {
      const user = await findUserByEmail(decodedToken.email);
      if (user?._id) {
        const accessJWT = generateAccessJWT(user.email);
        req.newAccessToken = accessJWT;
        next();
        return;
      }
    }
  } catch (error) {
    buildErrorResponse(res, "Invalid token, unauthorized");
  }
};
