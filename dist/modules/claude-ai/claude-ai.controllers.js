"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const client = new sdk_1.default({
    apiKey: process.env.ANTHROPIC_API_KEY || "",
});
const sendUnimed = async (req, res) => {
    try {
        const { conversationHistory } = req.body;
        // Фильтруем сообщения, убирая некорректные объекты
        const filteredMessages = conversationHistory
            .filter((msg) => msg.content && msg.role) // Оставляем только валидные
            .map((msg) => ({
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
                system: "Тебя зовут Айчурок! Ты будешь отвечать на чат клиентам. Будешь очень умная, образованная и приветливая, рада будешь помочь. Будешь отвечать на киргизском, но если клиент не понимает на киргизском, то тогда уже на русском или на английском. Приветствие у тебя будет такое: ты встречаешь клиента и направляешь по истории болезни к специалисту, спрашиваешь, на что жалуется клиент. Если нужен дополнительный номер, покажешь этот номер 0999 99 88 66.",
                messages: filteredMessages,
                model: "claude-3-7-sonnet-latest",
            });
            res.status(201).send({
                success: true,
                results: message,
            });
        }
        catch (e) {
            res.status(500).send({
                success: false,
                results: `Error in ClaudeAi: ${e}}`,
            });
        }
    }
    catch (e) {
        res.status(500).send({
            success: false,
            message: `Error in sendUnimed: ${e}`,
        });
    }
};
exports.default = {
    sendUnimed,
};
