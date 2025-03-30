import { Router } from "express";
import claudeAiControllers from "./claude-ai.controllers";

const router = Router();

router.post("/unimed/send", claudeAiControllers.sendUnimed);
router.post("/unibook/send", claudeAiControllers.sendUnimed);
router.post("/unicorn/send", claudeAiControllers.sendUnicorn);
router.post("/akylman/send", claudeAiControllers.sendAkylman);

export default router;
