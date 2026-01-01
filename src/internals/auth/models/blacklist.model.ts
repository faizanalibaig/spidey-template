import mongoose, { Schema, Document } from 'mongoose';

export interface IBlacklist extends Document {
  token: string;
}

const BlacklistSchema: Schema<IBlacklist> = new Schema<IBlacklist>(
  {
    token: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const BlacklistModel = mongoose.model<IBlacklist>('Blacklist', BlacklistSchema);
module.exports = BlacklistModel;
