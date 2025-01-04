
import mongoose from 'mongoose';


const visitSchema = new mongoose.Schema({
    referralCode: {
      type: String,
      required: true,
    },
    visitorIP: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    }
  }, { timestamps: true });
  
  export default mongoose.model('Visit', visitSchema);