import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

blacklistTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 

export default mongoose.model('BlacklistToken', blacklistTokenSchema);