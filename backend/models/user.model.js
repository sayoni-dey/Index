import mongoose from 'mongoose';

//Users: Manages authentication and login credentials for platform admins, such as issuer and security administrators.

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { 
    type: String, 
    enum: ['super_admin', 'issuer_admin', 'security_admin'], 
    default: 'issuer_admin' 
  },
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', default: null }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);