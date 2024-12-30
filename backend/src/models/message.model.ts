import mongoose, { Schema } from "mongoose";
interface MessageDbTypes {
  fullname: string;
  messages: string[];
}
const messageSchema = new Schema<MessageDbTypes>({
  fullname: {
    type: String,
    required: true,
    expires: 48 * 3600, // two days
  },
  messages: {
    type: [String],
    default: [],
  },
});
const messageModel = mongoose.model("message", messageSchema);
export default messageModel;
