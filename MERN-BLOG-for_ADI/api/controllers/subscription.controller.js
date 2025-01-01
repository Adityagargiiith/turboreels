import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const updateSubscription = async (req, res, next) => {
  const { userId } = req.params;
  const { orderId, planName, credits } = req.body;

  try {
    // Verify that the user making the request is the same as userId
    if (req.user.id !== userId) {
      return next(errorHandler(403, 'You can only update your own subscription'));
    }

    // Find and update the user's subscription details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          activePlan: planName,
          credits: credits
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Remove sensitive information before sending response
    const { password, ...rest } = updatedUser._doc;
    
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionStatus = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Verify that the user making the request is the same as userId
    if (req.user.id !== userId) {
      return next(errorHandler(403, 'You can only view your own subscription'));
    }

    const user = await User.findById(userId).select('activePlan credits');
    
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json({
      activePlan: user.activePlan,
      credits: user.credits
    });
  } catch (error) {
    next(error);
  }
};