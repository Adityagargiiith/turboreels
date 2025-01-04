// routes/affiliate.route.js
import express from "express";
import {
  generateAffiliateLink,
  trackVisit,
  getReferredData,
} from "../controllers/affiliate.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Generate affiliate link
router.post("/generate", verifyToken, generateAffiliateLink);

// Track visit and redirect
router.get("/track/:referralCode", trackVisit);

// Get referred logins and earnings
router.get("/data", verifyToken, getReferredData);

export default router;