"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const claude_ai_routes_1 = __importDefault(require("../modules/claude-ai/claude-ai.routes"));
const corsConfig = {
    origin: "*",
    // credentials: true,
};
const router = (0, express_1.Router)();
router.use("/claude-ai", (0, cors_1.default)(corsConfig), claude_ai_routes_1.default);
exports.default = router;
