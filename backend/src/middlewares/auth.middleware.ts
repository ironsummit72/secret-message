import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export async function basicAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.session;
  if (token) {
    const user = jwt.verify(token, process.env.SECRET!) as { _id: string };
    const userId = user._id;
    req.user = { id: userId };
    next();
  } else {
    res.status(400).json({ message: "something went wrong or user not found" });
    next();
  }
}
