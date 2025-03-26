import TelegramBot from "node-telegram-bot-api";
import { setBotCommands } from "./commands";
import { handleNewChatMembers, handleGroupInfo } from "./groupHandlers";
import { handleHelpContact } from "./helpHandlers";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
if (!BOT_TOKEN) {
	throw new Error("Токен бота не указан!");
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Установка команд
setBotCommands(bot);

// Обработка событий
bot.onText(/\/start/, async (msg) => handleHelpContact(bot, msg));
bot.onText(/\/groupinfo/, async (msg) => handleGroupInfo(bot, msg));
bot.on("new_chat_members", async (msg) => handleNewChatMembers(bot, msg));

console.log("Бот запущен!");

export default bot;
