import { Router } from "express";
import {
  createMessage,
  createUser,
  getMessages,
  getUserDetails,
} from "../controllers/message.controller";
import { basicAuth } from "../middlewares/auth.middleware";
const router = Router();

router.patch("/create/:id", createMessage);
router.post("/create", createUser);
router.get('/user/:id',getUserDetails)
router.get("/get", basicAuth, getMessages);

export default router;
