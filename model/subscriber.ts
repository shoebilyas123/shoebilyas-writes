import mongoose, { Schema } from "mongoose";

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

export default mongoose.models?.Subscriber ||
  mongoose.model("Subscriber", subscriberSchema);
