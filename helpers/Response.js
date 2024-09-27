export const sendResponse = (res,status, data, message = "") => {
  try {
    return res
      .status(status)
      .json({ status_code: status, message: message, data });
  } catch (error) {
    console.log("🚀 ~ file: Response.js:6 ~ sendResponse ~ error:", error);
  }
};
