import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config, { has } from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(inputPassword: string): Promise<Boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// hash the user password before storing in db
UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocument;

  // hash the password if it is new or modified
  if (!user.isModified("password")) {
    return next();
  }

  //  random hashing key
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  return next();
});

// method which hashes the input password with the passowrd stored in db
UserSchema.methods.comparePassword = async function (inputPassword: string) {
  const user = this as UserDocument;
  return bcrypt.compare(inputPassword, user.password).catch((err) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
