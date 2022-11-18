import express from "express";
import authCtrl from "../controllers/auth.controller";
import cors from "cors";

const router = express.Router();

router.route("/auth/login").post(authCtrl.signIn);

router.route("/auth/logout").get(authCtrl.signOut);

export default router;
