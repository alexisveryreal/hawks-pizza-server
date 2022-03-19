import { model, Schema, Document } from 'mongoose';
import { Profile } from '@/interfaces/profile.interface';

const profileSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const profileModel = model<Profile & Document>('Profile', profileSchema);

export default profileModel;
