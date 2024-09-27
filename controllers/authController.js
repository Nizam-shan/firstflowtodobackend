import Joi from "joi";
import { sendResponse } from "../helpers/Response.js";
import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, 401, null, "User not found!..");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, null, "Password doesnot match");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const userDetails = {
      token,
      user,
    };
    return sendResponse(res, 200, { userDetails }, "Login successfull");
  } catch (error) {
    return sendResponse(res, 500, null, "Server error");
  }
};

const registrationJoiValidation = Joi.object({
  first_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),

  confirm_password: Joi.string().allow(""),
});

export const userRegistration = async (req, res) => {
  try {
    const { error } = registrationJoiValidation.validate(req.body);
    if (error) {
      return sendResponse(res, 400, null, error?.details[0]?.message);
    }

    const { first_name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return sendResponse(res, 400, null, "User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      first_name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return sendResponse(res, 201, user, "User registered successfully");
  } catch (error) {
    return sendResponse(res, 500, null, "Server error");
  }
};
