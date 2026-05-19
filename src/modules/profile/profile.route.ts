import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router()


router.post("/", profileController.createUserProfile )

export const profileRouter = router;