"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const watch_route_1 = __importDefault(require("./routes/watch.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/watch", watch_route_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Watch backend running on port ${PORT}`);
});
