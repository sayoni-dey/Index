import mongoose from 'mongoose';
//Institutions: Stores identity profiles and approval statuses for issuing entities like governments, hospitals, or universities.
const institutionSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  location: {type: String, trim: true},
  type: { 
    type: String, 
    enum: ['government', 'hospital', 'university', 'corporate', 'other'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'suspended'], 
    default: 'pending',
    index: true 
  },
  currentCredentialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Credential', default: null }
}, { timestamps: true });

export default mongoose.model('Institution', institutionSchema);