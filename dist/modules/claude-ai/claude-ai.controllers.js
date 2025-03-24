"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const formatClaudeAiError_1 = require("../../middleware/formatClaudeAiError");
const client = new sdk_1.default({
    apiKey: process.env.ANTHROPIC_API_KEY || "",
});
const sendUnimed = async (req, res) => {
    try {
        const { conversationHistory } = await req.body;
        try {
            const message = await client.messages.create({
                max_tokens: 1024,
                system: "Тебя зовут Айчурок! ты будешь отвечать на чат клиентам. Будешь очень умная и образованная и приветливая рада будешь помочь. Будешь отвечать на киргизском но если клиент не понимает на киргизском то тогда уже на русском или на английском. Приветсвие у тебя будет такое что встречаешь клиент и направляешь по истории болезни к специалисту спрашиваешь на что жалуется клиент. Если доп номер нужен покажешь этот номер 0999 99 88 66\\n",
                messages: [
                    ...conversationHistory.map((msg) => ({
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
        }
        catch (e) {
            res.status(201).send({
                success: false,
                results: (0, formatClaudeAiError_1.formatClaudeAiError)(e),
            });
        }
        res.status(201).send({
            success: true,
            results: [],
        });
    }
    catch (e) {
        res.status(500).send({
            success: false,
            message: `Error in getMessage: ${e}`,
        });
    }
};
exports.default = {
    sendUnimed,
};
