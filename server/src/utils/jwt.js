import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const accessTokenSecret = "bestsecret";

export const signAccessToken = (payload) => {
  try {
    const token = jwt.sign({ payload }, accessTokenSecret, { expiresIn: "1h" });
    return token;
  } catch (e) {
    throw e.message;
  }
};

export const verifyAccessToken = (token) => {
  try {
    const payload = jwt.verify(token, accessTokenSecret);
    return payload.payload;
  } catch (e) {
    throw e.message;
  }
};
