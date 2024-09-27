import Joi from "joi";
import { sendResponse } from "../helpers/Response.js";
import crudSchema from "../models/taskfirst.schema.js";

let addvalidation = Joi.object({
  title: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/) // Only allows letters, numbers, and spaces
    .required()
    .messages({
      "string.pattern.base": "Title must not contain special characters",
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
  descriptions: Joi.string().required(),
  status: Joi.string().valid("pending", "in-progress", "completed").optional(),
});
export const add = async (req, res) => {
  console.log("🚀 ~ add ~ req:", req.user);
  try {
    const { error } = addvalidation.validate(req.body);
    if (error) {
      return sendResponse(res, 400, null, error?.details[0]?.message);
    }
    const { title, descriptions } = req.body;

    const alreadyExist = await crudSchema.findOne({ title, user: req.user.id });
    if (alreadyExist)
      return sendResponse(res, 400, null, "Task with same title already");

    const newTask = new crudSchema({
      title,
      descriptions,
      user: req.user.id,
    });
    await newTask.save();
    return sendResponse(res, 201, newTask, "Task added successfully");
  } catch (err) {
    console.log("🚀 ~ add ~ err:", err);
    return sendResponse(res, 500, null, err.message);
  }
};

export const getAllTask = async (req, res) => {
  try {
    const task = await crudSchema.find({ user: req.user.id });
    return sendResponse(res, 200, task, "Fetched all tasks Successfully");
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};

export const getAllTaskById = async (req, res) => {
  try {
    const task = await crudSchema.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return sendResponse(res, 404, null, "Task not found");
    return sendResponse(res, 200, task, "task details fetched successfully");
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { error } = addvalidation.validate(req.body);
    if (error) {
      return sendResponse(res, 400, null, error?.details[0]?.message);
    }

    // const userId = req.params.userId;
    const updatedTask = await crudSchema.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTask) return sendResponse(res, 404, null, "task not found");
    return sendResponse(
      res,
      200,
      updatedTask,
      "task details updated successfully"
    );
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const updatedTask = await crudSchema.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: req.body.status },
      { new: true }
    );
    if (!updatedTask) return sendResponse(res, 404, null, "task not found");
    return sendResponse(
      res,
      200,
      updatedTask,
      "task details updated successfully"
    );
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await crudSchema.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedTask) return sendResponse(res, 404, null, "Task not found");
    return sendResponse(res, 200, null, "Task deleted successfully");
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};
