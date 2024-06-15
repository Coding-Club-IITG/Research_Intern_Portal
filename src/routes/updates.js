import express from "express";
import { getUpdateById, getUpdates, editUpdate, deleteUpdate} from "../controllers/updates.js"

const router = express.Router();

router.get("/", getUpdates);
router.get("/:id", getUpdateById);
router.put("/:id", editUpdate);
router.delete("/:id", deleteUpdate);

export default router;

