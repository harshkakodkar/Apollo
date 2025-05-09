import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    default: '', // optional field
  },
  fee: {
    type: String, // Use Number if you'd prefer to store like 429
    default: '',
  },
  onlineFee: {
    type: String, // Use Number for storing
    default: '',
  },
  visitFee: {
    type: String, // Use Number for storing
    default: '',
  },
  image: {
    type: String,
    default: '/placeholder.svg?height=80&width=80',
  },
  languages: {
    type: [String], // Array to store languages
    required: true,
  },
  consultModes: {
    type: [String], // Array to store consultation modes
    required: true,
  },
});

// Export model with no explicit `id` field
export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
