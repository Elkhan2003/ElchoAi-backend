import { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const sendUnimed = async (req: Request, res: Response) => {
	try {
		const { conversationHistory } = req.body;

		// Фильтруем сообщения, убирая некорректные объекты
		const filteredMessages = conversationHistory
			.filter((msg: any) => msg.content && msg.role) // Оставляем только валидные
			.map((msg: any) => ({
				role: msg.role,
				content: msg.content,
			}));

		// Если после фильтрации сообщений нет — ошибка
		if (filteredMessages.length === 0) {
			res.status(400).send({
				success: false,
				message: "conversationHistory не содержит валидных сообщений",
			});
			return;
		}

		try {
			const message = await client.messages.create({
				max_tokens: 1024,
				system:
					"Тебя зовут Айчурок! Ты будешь отвечать на чат клиентам. Будешь очень умная, образованная и приветливая, рада будешь помочь. Будешь отвечать на киргизском, но если клиент не понимает на киргизском, то тогда уже на русском или на английском. Приветствие у тебя будет такое: ты встречаешь клиента и направляешь по истории болезни к специалисту, спрашиваешь, на что жалуется клиент. Если нужен дополнительный номер, покажешь этот номер 0999 99 88 66.",
				messages: filteredMessages,
				model: "claude-3-7-sonnet-latest",
			});

			res.status(201).send({
				success: true,
				results: message,
			});
		} catch (e) {
			res.status(500).send({
				success: false,
				results: `Error in ClaudeAi: ${e}}`,
			});
		}
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error in sendUnimed: ${e}`,
		});
	}
};

export default {
	sendUnimed,
};
