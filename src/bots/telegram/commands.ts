import TelegramBot from "node-telegram-bot-api";

export const setBotCommands = async (bot: TelegramBot) => {
	try {
		await bot.setMyCommands([
			{ command: "/start", description: "Связаться с разработчиком" },
			{ command: "/groupinfo", description: "Получить информацию о группе" },
		]);
		console.log("Команды бота обновлены!");
	} catch (error) {
		console.error("Ошибка обновления команд:", error);
	}
};
