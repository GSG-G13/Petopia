"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// just for testing endpoint.
router.get('/test', (_req, res) => {
    res.json({
        error: false,
        data: {
            id: 0,
            message: 'hello'
        }
    });
});
exports.default = router;
