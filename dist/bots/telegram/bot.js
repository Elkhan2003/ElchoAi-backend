"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const commands_1 = require("./commands");
const groupHandlers_1 = require("./groupHandlers");
const helpHandlers_1 = require("./helpHandlers");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) {
    throw new Error("Токен бота не указан!");
}
const bot = new node_telegram_bot_api_1.default(BOT_TOKEN, { polling: true });
// Установка команд
(0, commands_1.setBotCommands)(bot);
// Обработка событий
bot.onText(/\/start/, async (msg) => (0, helpHandlers_1.handleHelpContact)(bot, msg));
bot.onText(/\/groupinfo/, async (msg) => (0, groupHandlers_1.handleGroupInfo)(bot, msg));
bot.on("new_chat_members", async (msg) => (0, groupHandlers_1.handleNewChatMembers)(bot, msg));
console.log("Бот запущен!");
exports.default = bot;
