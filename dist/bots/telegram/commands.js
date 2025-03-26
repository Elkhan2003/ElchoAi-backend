"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBotCommands = void 0;
const setBotCommands = async (bot) => {
    try {
        await bot.setMyCommands([
            { command: "/start", description: "Связаться с разработчиком" },
            { command: "/groupinfo", description: "Получить информацию о группе" },
        ]);
        console.log("Команды бота обновлены!");
    }
    catch (error) {
        console.error("Ошибка обновления команд:", error);
    }
};
exports.setBotCommands = setBotCommands;
