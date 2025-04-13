"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const claude_ai_controllers_1 = __importDefault(require("./claude-ai.controllers"));
const router = (0, express_1.Router)();
router.post("/unimed/send", claude_ai_controllers_1.default.sendUnimed);
router.post("/unibook/send", claude_ai_controllers_1.default.sendUnimed);
router.post("/unicorn/send", claude_ai_controllers_1.default.sendUnicorn);
router.post("/akylman/send", claude_ai_controllers_1.default.sendAkylman);
router.post("/elcho_dev/send", claude_ai_controllers_1.default.sendElchoDev);
router.post("/motion_web/send", claude_ai_controllers_1.default.sendMotionWeb);
exports.default = router;
