import { Request, Response } from "express";
import userModel from "../models/message.model";
import jwt from "jsonwebtoken";
export async function createUser(req: Request, res: Response) {
  type bodyType = {
    fullname: string;
  };
  const { fullname }: bodyType = req.body;
  const dbResponse = await userModel.create({ fullname });
  if (dbResponse) {
    const token = jwt.sign({ _id: dbResponse.id }, process.env.SECRET!);
    res.cookie("session", token);
    res.status(200).json({
      message:
        "user created successfully now you can share this link to other user to know what message they have for you ",
      user: dbResponse.id,
    });
  } else {
    res.status(400).json({ message: "something went wrong :)" });
  }
}
export async function createMessage(req: Request, res: Response) {
  const { id } = req.params;
  const { message } = req.body;
  if (id) {
    const dbResponse = await userModel.findOneAndUpdate(
      { _id: id },
      { $push: { messages: message } }
    );
    if (dbResponse) {
      res.status(201).json({
        message:
          "your friend can see this message. with out knowing your identity",
      });
    }
  }
}
export async function getMessages(req: Request, res: Response) {
  const loggedInUser = req.user?.id;
  if (loggedInUser) {
    const dbResponse = await userModel.findById(loggedInUser, { __v: 0 });
    if (dbResponse) {
      res.status(200).json({
        id: dbResponse.id,
        fullname: dbResponse.fullname,
        messages: dbResponse.messages,
      });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } else {
    res.status(400).json({ message: "something went wrong..." });
  }
}
export async function getUserDetails(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    try {
      const dbResponse = await userModel.findById(id);
      if (dbResponse) {
        res.status(200).json({ fullname: dbResponse.fullname });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
