import User from "../models/user.model.js";
import Visit from "../models/visit.model.js";
import { errorHandler } from "../utils/error.js";

// Generate Affiliate Link
export const generateAffiliateLink = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const referralCode = Math.random().toString(36).substr(2, 9);
    const affiliateLink = `${req.protocol}://${req.get("host")}/api/affiliate/track/${referralCode}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        affiliate: affiliateLink,
        referralCode: referralCode 
      },
      { new: true }
    );

    res.status(200).json({ 
      affiliateLink: updatedUser.affiliate,
      referralCode: updatedUser.referralCode 
    });
  } catch (error) {
    next(error);
  }
};

// Track Visit and Redirect
export const trackVisit = async (req, res, next) => {
  try {
    const { referralCode } = req.params;
    const visitorIP = req.ip;
    const userAgent = req.headers['user-agent'];

    // Find user with this referral code
    const affiliate = await User.findOne({ referralCode });
    if (!affiliate) {
      return next(errorHandler(404, "Invalid referral code"));
    }

    // Check for duplicate visit in last 24 hours
    const existingVisit = await Visit.findOne({
      referralCode,
      visitorIP,
      userAgent,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (!existingVisit) {
      // Create new visit record
      await Visit.create({
        referralCode,
        visitorIP,
        userAgent
      });

      // Increment visit count
      await User.findByIdAndUpdate(
        affiliate._id,
        { $inc: { linkVisits: 1 } }
      );
    }

    // Redirect to signup page with referral code
    res.redirect(`/signup?ref=${referralCode}`);
  } catch (error) {
    next(error);
  }
};

// Get Referred Data
export const getReferredData = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const referredLogins = user.referralLogins;
    const linkVisits = user.linkVisits;
    const earnings = referredLogins * 5; // $5 per referral

    res.status(200).json({ 
      referredLogins, 
      linkVisits,
      earnings 
    });
  } catch (error) {
    next(error);
  }
};