import { sendError, sendSuccess } from "../utils/common";
import { executeQuery } from "../utils/database";

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await executeQuery(`select * from users`);
    sendSuccess(req, res, users);
  } catch (error) {
    console.log(error);
    sendError(req, res, error);
  }
};
