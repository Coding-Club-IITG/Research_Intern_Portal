import express from "express";
import {
  getUpdateById,
  getUpdates,
  editUpdate,
  deleteUpdate,
  createUpdate,
} from "../controllers/updates.js";

const router = express.Router();

router.post("/", createUpdate);
router.get("/", getUpdates);
router.get("/:id", getUpdateById);
router.put("/:id", editUpdate);
router.delete("/:id", deleteUpdate);

export default router;
