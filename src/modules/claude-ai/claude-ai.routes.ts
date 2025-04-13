import { Router } from "express";
import claudeAiControllers from "./claude-ai.controllers";

const router = Router();

router.post("/unimed/send", claudeAiControllers.sendUnimed);
router.post("/unibook/send", claudeAiControllers.sendUnimed);
router.post("/unicorn/send", claudeAiControllers.sendUnicorn);
router.post("/akylman/send", claudeAiControllers.sendAkylman);
router.post("/elcho_dev/send", claudeAiControllers.sendElchoDev);
router.post("/motion_web/send", claudeAiControllers.sendMotionWeb);

export default router;
