import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};

  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    filter = { email };
  }

  // const update = {};
  // /* we don't need them because as we have lots of data in 'data'/req.json so we can update them directly
  // if ("name" in data) {
  //   update.name = data.name;
  // }
  // if ("image" in data) {
  //   update.image = data.image;
  // }
  // if (Object.keys(update).length > 0) {
  //   //update user name
  //   await User.updateOne({ email }, update);
  // } */

  const user = await User.findOne(filter);
  await User.updateOne(filter, { name, image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });

  return new Response(JSON.stringify(true), { status: 200 });
}

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    let filterUser = {};

    if (_id) {
      filterUser = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      if (!email) {
        return new Response(JSON.stringify({}), { status: 200 });
      }
      filterUser = { email };
    }

    const user = await User.findOne(filterUser).lean();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    if (!userInfo) {
      return new Response(JSON.stringify({ error: "User info not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ ...user, ...userInfo }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
