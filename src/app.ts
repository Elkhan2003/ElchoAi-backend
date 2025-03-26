import { config } from "dotenv";
config();
import express from "express";
import routes from "./routes";

if (process.env.TELEGRAM_BOT_ACTIVE === "yes") {
	import("./bots/telegram/bot").catch((error) =>
		console.error("Ошибка импорта бота:", error)
	);
}

export const buildServer = () => {
	const server = express();

	// Middleware
	server.use(express.json());

	server.get("/", (req, res) => {
		res.status(200).send({
			message: "Hello World!",
		});
	});

	server.use("/api/v1", routes);

	return server;
};
