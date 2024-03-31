import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      // validate: (pass) => {
      //   if (!pass?.length || pass.length < 5) {
      //     new Error("password must be at least 5 characters");
      //   }
      // },
    },
    image: { type: String },
  },
  { timestamps: true }
);
// UserSchema.post("validate", function (user) {
//   const salt = bcrypt.genSaltSync(10);
//   user.password = bcrypt.hashSync(user.password, salt);
// });

export const User = models?.User || model("User", UserSchema);
