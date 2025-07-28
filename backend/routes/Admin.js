const express = require("express");
const { requireAuth, getAuth } = require("@clerk/express");
const { users } = require("@clerk/clerk-sdk-node"); // <-- import Clerk users API

const router = express.Router();

router.get("/check", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const user = await users.getUser(userId); // <-- Fetch full user object

    const isAdmin = user.privateMetadata?.isAdmin;


    if (isAdmin) {
      console.log("Admin verified");
      return res.status(200).json({ success: true, isAdmin: true });
    } else {
      return res.status(403).json({ success: false, isAdmin: false, message: "Access denied" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;