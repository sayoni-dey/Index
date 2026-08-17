// controllers/institution.controller.js
import { clerkClient } from "@clerk/express"; // or "@clerk/backend"
import Institution from "../models/institution.model.js";

export const registerInstitution = async (req, res) => {
  const { name, location, email, type, password } = req.body;

  // 1. Basic validation check
  if (!email || !password || !name || !type) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: email, password, name, and type are required."
    });
  }

  let clerkUser = null;

  try {
    // 2. Create user in Clerk
    clerkUser = await clerkClient.users.createUser({
      emailAddress: [email], // Array of strings
      password: password,     // String (must satisfy Clerk's password policy)
      firstName: name,
      publicMetadata: {
        role: "INSTITUTION_ADMIN"
      }
    });

    // 3. Create document in MongoDB
    const newInstitution = await Institution.create({
      clerkId: clerkUser.id,
      name,
      location,
      email,
      type
    });

    return res.status(201).json({
      success: true,
      message: "Institution and Admin User created successfully",
      data: newInstitution
    });

  } catch (error) {
    // Rollback if MongoDB creation fails after Clerk creation succeeded
    if (clerkUser) {
      await clerkClient.users.deleteUser(clerkUser.id);
    }

    console.error("Institution Registration Error:", error);

    // Express precise Clerk validation errors to the caller
    const clerkErrorMessage = error.errors?.[0]?.longMessage || error.message;

    return res.status(error.status || 500).json({
      success: false,
      message: "Failed to register institution",
      error: clerkErrorMessage
    });
  }
};