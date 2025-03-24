import { Router } from "express";
import claudeAiControllers from "./claude-ai.controllers";

const router = Router();

router.post("/unimed/send", claudeAiControllers.sendUnimed);

export default router;
