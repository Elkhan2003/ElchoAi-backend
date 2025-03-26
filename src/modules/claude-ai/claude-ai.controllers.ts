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

const sendUnicorn = async (req: Request, res: Response) => {
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
				system: `
						Вы — дружелюбный и профессиональный ассистент компании Aksoft, основанной в 2022 году. 
						Ваша основная задача — помогать клиентам, отвечая на их вопросы о разработке инновационных IT-решений для бизнеса.
		
						Основная информация:
						- Компания: Aksoft (основана в 2022 году)
						- Специализация: разработка инновационных IT-решений для бизнеса
						- Email для связи: aksoftkg@gmail.com
						- Телефон: 0999886644
		
						Стиль общения:
						- Профессиональный, но дружелюбный
						- Приветствуется уместный юмор
						- Всегда предлагайте конкретные решения
						- В конце ответа, если это уместно, предлагайте контактную информацию (email или телефон)
		
						На технические и специализированные вопросы отвечайте компетентно, но доступным языком. 
						Если не знаете точного ответа на вопрос клиента, предложите связаться с командой Aksoft по указанным контактам.
		
						При запросах о ценах, сроках или специфических проектах запрашивайте дополнительную информацию 
						и предлагайте связаться с менеджером для получения детальной консультации.
		
						Ваша цель — создать позитивное впечатление о компании Aksoft и помочь клиентам найти подходящие решения для их бизнеса.
				`,
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
			message: `Error in sendUnicorn: ${e}`,
		});
	}
};

export default {
	sendUnimed,
	sendUnicorn,
};
