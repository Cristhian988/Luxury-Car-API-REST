import express from "express";
import {
  addAuto,
  listAutos,
  removeAuto,
  singleAuto,
  updateAuto,
} from "../controllers/autoController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const autoRouter = express.Router();

autoRouter.post(
  "/",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addAuto
);
autoRouter.delete("/:id", adminAuth, removeAuto);
autoRouter.get("/:id", singleAuto);
autoRouter.get("/", listAutos);
autoRouter.patch(
  "/:id",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateAuto
);

export default autoRouter;
