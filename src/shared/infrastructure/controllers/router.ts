import { Router } from "express";
import { getVersion } from "./version";

const multer = require("multer");

const router = Router();
const upload = multer();

router.get("/version", getVersion);

export default router;
