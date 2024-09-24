import { User } from "@/app/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    // Connect to MongoDB
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const body = await req.json();
    const pass = body.password;

    // Validate password length
    if (!pass || pass.length < 5) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 5 characters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(pass, salt);

    // Create the user
    const createdUser = await User.create(body);

    // Return the created user response
    return new Response(JSON.stringify(createdUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while creating the user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
