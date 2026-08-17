import mongoose from 'mongoose';
//MediaAssets: Retains metadata and external storage references for original uploaded media files like audio or video.

const mediaAssetSchema = new mongoose.Schema({
  storageUrl: { type: String, required: true }, // S3 / Cloudinary URL
  mimeType: { type: String, required: true },
  sizeBytes: { type: Number, required: true },
  contentHash: { type: String, required: true, index: true }, // SHA-256 / SHA-512
  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: false });

export default mongoose.models.MediaAsset || mongoose.model('MediaAsset', mediaAssetSchema);