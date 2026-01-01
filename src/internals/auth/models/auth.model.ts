import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  token: string;
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

UserSchema.post('save', async function (doc: IUser) {
  doc.username = doc.username.toLowerCase().trim();

  await doc.save();
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel };
