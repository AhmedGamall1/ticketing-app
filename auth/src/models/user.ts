import mongoose from "mongoose";
import { Password } from "../services/password.js";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  // Adding a toJSON method to the user schema to control what gets sent back when a user document is converted to JSON
  // for hiding sensitive data and make data consistent across the application with different backends
  {
    toJSON: {
      transform(doc, ret) {
        return {
          id: ret._id,
          email: ret.email,
        };
      },
    },
  },
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
});

// Adding a static method to the user schema for building a new user
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
