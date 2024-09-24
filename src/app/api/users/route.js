import { isAdmin } from "@/app/api/auth/[...nextauth]/route.js";
import { User } from "@/app/models/User";

import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
