import pkg from "jsonwebtoken";
import User from "../models/user.schema.js";
import { sendResponse } from "../helpers/Response.js";
const { verify } = pkg;

export default async function (req, res, next) {
  let token = req?.header("Authorization"); // get token
  console.log("🚀 ~ user:", req?.user);

  if (!token) {
    return sendResponse(res, 401, null, "Unauthorized. Access Denied");
  }
  if (token.startsWith("Bearer ")) {
    // incliuding bearer
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET); // it veridy token valid or what
    console.log("🚀 ~ decoded:", decoded);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return sendResponse(res, 401, null, "Unauthorized. User not found");
    }

    next();
  } catch (err) {
    return sendResponse(res, 401, null, "Invalid token");
  }
}
