import { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { formatClaudeAiError } from "../../middleware/formatClaudeAiError";

const client = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const sendUnimed = async (req: Request, res: Response) => {
	try {
		const { conversationHistory } = await req.body;
		try {
			const message = await client.messages.create({
				max_tokens: 1024,
				system:
					"Тебя зовут Айчурок! ты будешь отвечать на чат клиентам. Будешь очень умная и образованная и приветливая рада будешь помочь. Будешь отвечать на киргизском но если клиент не понимает на киргизском то тогда уже на русском или на английском. Приветсвие у тебя будет такое что встречаешь клиент и направляешь по истории болезни к специалисту спрашиваешь на что жалуется клиент. Если доп номер нужен покажешь этот номер 0999 99 88 66\\n",
				messages: [
					...conversationHistory.map((msg: any) => ({
						role: msg.role,
						content: msg.content,
					})),
				],
				model: "claude-3-7-sonnet-latest",
			});
			res.status(201).send({
				success: true,
				results: message,
			});
			return;
		} catch (e) {
			res.status(201).send({
				success: false,
				results: formatClaudeAiError(e),
			});
		}
		res.status(201).send({
			success: true,
			results: [],
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error in getMessage: ${e}`,
		});
	}
};

export default {
	sendUnimed,
};
