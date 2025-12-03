import express from "express";
import { list, getById, addPoints } from "../controllers/userController.js";
const router = express.Router();
router.get("/", list);
router.get("/:id", getById);
router.post("/:id/add-points", addPoints);
export default router;
