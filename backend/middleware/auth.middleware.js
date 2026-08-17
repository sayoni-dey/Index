// middleware/auth.middleware.js
import { requireAuth } from "@clerk/express";

export const protectRoute = requireAuth();