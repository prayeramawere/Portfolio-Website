import { Router } from "express";
import { getAdmin, updateAdmin, getPublicAdmin } from "../controllers/admin.js";
const router = Router();
import authenticationMiddleware from "../middleware/auth.cjs";
import { addAdmin } from "../config/db.js";

router.get("/add", async (req, res) => {
  try {
    await addAdmin();
    res.send("user added successfully");
  } catch (error) {
    res.send(`an error occured: ${error}`);
  }
});

router.get("/public", getPublicAdmin);

router.post("/", authenticationMiddleware, getAdmin);

router.post("/update", authenticationMiddleware, updateAdmin);

export default router;
