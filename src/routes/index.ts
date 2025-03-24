import { Router } from "express";
import cors from "cors";
import claudeAiRoutes from "../modules/claude-ai/claude-ai.routes";

const corsConfig = {
	origin: [
		"http://localhost:3000",
		"http://localhost:5000",
		"http://localhost:5173",
		"https://elcho.dev",
		"https://web-unimed.elcho.dev",
		"https://patient-unimed.vercel.app",
		"https://unimed-next.vercel.app",
	],
	// credentials: true,
};

const router = Router();

router.use("/claude-ai", cors(corsConfig), claudeAiRoutes);

export default router;
