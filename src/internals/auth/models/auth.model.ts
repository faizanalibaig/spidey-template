import mongoose, { Schema, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  token: string;
  HashPassword(password: string): Promise<string>;
  ComparePassword(password: string): Promise<boolean>;
  GenerateToken(): Promise<string>;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    token: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.HashPassword = async function (
  password: string,
): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.ComparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.GenerateToken = async function (): Promise<string> {
  const token = jwt.sign(
    {
      user: {
        id: this._id,
        username: this.username,
        email: this.email,
      },
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1d',
      algorithm: 'ES512',
    },
  );

  this.token = token;
  await this.save();

  return token;
};

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel };
