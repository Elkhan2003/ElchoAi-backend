import TelegramBot from "node-telegram-bot-api";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

export const handleNewChatMembers = async (
	bot: TelegramBot,
	msg: TelegramBot.Message
) => {
	const chatId = msg.chat.id;
	await sendGroupInfo(bot, chatId);
};

export const handleGroupInfo = async (
	bot: TelegramBot,
	msg: TelegramBot.Message
) => {
	const chatId = msg.chat.id;
	await sendGroupInfo(bot, chatId);
};

const sendGroupInfo = async (bot: TelegramBot, chatId: number) => {
	try {
		const chatInfo = await bot.getChat(chatId);

		let messageText = `${chatInfo.title}\n\n`;
		messageText += `ID группы: <code>${chatInfo.id}</code>\n\n`;

		if (chatInfo.photo) {
			const fileId = chatInfo.photo.big_file_id;
			const file = await bot.getFile(fileId);
			const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;
			messageText += `Ссылка на аватар группы: ${fileUrl}\n\n`;
		}

		if (chatInfo.invite_link) {
			messageText += `Ссылка приглашения: ${chatInfo.invite_link}\n\n`;
		}

		await bot.sendMessage(chatId, messageText, { parse_mode: "HTML" });
	} catch (error) {
		console.error("Ошибка получения информации о чате:", error);
		await bot.sendMessage(chatId, "Не удалось получить информацию о чате.");
	}
};

// export const sendGroupInfo = async (bot: TelegramBot, chatId: number) => {
// 	try {
// 		const chatInfo = await bot.getChat(chatId);
// 		const inviteLink = chatInfo.invite_link || "Ссылка приглашения не найдена.";
// 		await bot.sendMessage(chatId, `Информация о группе: "${chatInfo.title}"`);
// 		await bot.sendMessage(chatId, `ID группы: ${chatInfo.id}`);
// 		let groupAvatar = "";
// 		if (chatInfo.photo) {
// 			const fileId = chatInfo.photo.big_file_id;
// 			const file = await bot.getFile(fileId);
// 			const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;
// 			groupAvatar = fileUrl;
// 			await bot.sendMessage(chatId, `Ссылка на аватар группы: ${fileUrl}`);
// 		} else {
// 			await bot.sendMessage(chatId, "Аватар группы отсутствует.");
// 		}
// 		await bot.sendMessage(chatId, `Ссылка приглашения: ${inviteLink}`);
// 		const existingGroup = await prisma.telegramGroupInfo.findFirst({
// 			where: { chatId: String(chatInfo.id) },
// 		});
// 		if (!existingGroup) {
// 			await prisma.telegramGroupInfo.create({
// 				data: {
// 					chatId: String(chatInfo.id),
// 					name: chatInfo.title!,
// 					photoUrl: groupAvatar,
// 					joinedAt: moment().utcOffset(6).format("YYYY-MM-DD HH:mm:ss Z"),
// 				},
// 			});
// 			await bot.sendMessage(
// 				chatId,
// 				"Информация о группе сохранена в базе данных."
// 			);
// 		} else {
// 			await bot.sendMessage(
// 				chatId,
// 				"Информация о группе уже существует в базе данных."
// 			);
// 		}
// 	} catch (error) {
// 		console.error("Ошибка получения информации о чате:", error);
// 		await bot.sendMessage(chatId, "Не удалось получить информацию о чате.");
// 	}
// };
