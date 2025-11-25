import { Schema, model } from 'mongoose';

const sheikhSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, default: '' },
  specialization: [{ type: String }],
  email: { type: String, required: true, unique: true },
  phone: { 
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{11}$/.test(v); // exactly 11 digits
      },
      message: props => `${props.value} is not a valid 11-digit phone number!`
    }
  },
  social: {
    youtube: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
});

export default model('Sheikh', sheikhSchema);
