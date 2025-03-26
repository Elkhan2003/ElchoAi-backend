"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHelpContact = void 0;
const handleHelpContact = async (bot, msg) => {
    const chatId = msg.chat.id;
    await helpContact(bot, chatId);
};
exports.handleHelpContact = handleHelpContact;
const helpContact = async (bot, chatId) => {
    try {
        const helpContactInfo = `
Привет! Если у вас есть вопросы или вы хотите связаться со мной, вот мои контактные данные:

🌐 Веб-сайт: [ElchoDev](https://elcho.dev)
📧 Email: boss.armsport@gmail.com
📱 Telegram: [@Elcho911](https://t.me/elcho911)
📘 GitHub: [Elkhan2003](https://github.com/Elkhan2003)
		`.trim();
        await bot.sendMessage(chatId, helpContactInfo, { parse_mode: 'Markdown' });
    }
    catch (error) {
        console.error('Ошибка получения информации о чате:', error);
        await bot.sendMessage(chatId, 'Не удалось получить информацию о чате.');
    }
};
