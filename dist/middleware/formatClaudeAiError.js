"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatClaudeAiError = void 0;
const formatClaudeAiError = (error) => {
    let errorMessage = "An unknown error occurred.";
    let errorType = "UnknownError";
    if (error instanceof Error) {
        if (error.message.includes("400")) {
            try {
                const errorResponse = JSON.parse(error.message.substring(error.message.indexOf("{")));
                if (errorResponse && errorResponse.error) {
                    errorMessage = errorResponse.error.message;
                    errorType = errorResponse.error.type;
                }
            }
            catch (parseError) {
                console.error("Error parsing error response:", parseError);
                errorMessage = error.message;
            }
        }
        else {
            errorMessage = error.message;
        }
    }
    return {
        error: {
            type: errorType,
            message: errorMessage,
        },
    };
};
exports.formatClaudeAiError = formatClaudeAiError;
