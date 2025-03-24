import { Router } from "express";
import cors from "cors";
import claudeAiRoutes from "../modules/claude-ai/claude-ai.routes";

const corsConfig = {
	origin: "*",
	// credentials: true,
};

const router = Router();

router.use("/claude-ai", cors(corsConfig), claudeAiRoutes);

export default router;
