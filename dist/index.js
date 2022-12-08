"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const createUser_1 = require("./routes/createUser");
const AdminRoute_1 = __importDefault(require("./routes/AdminRoute"));
const db_1 = __importDefault(require("./config/db"));
const StudentRoute_1 = __importDefault(require("./routes/StudentRoute"));
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", createUser_1.createUser);
app.use("/api/master", AdminRoute_1.default);
app.use("/api", StudentRoute_1.default);
app.use(function (err, _, res, next) {
    console.log(err);
    console.log("calling next function...", next);
    res.json({ success: false, msg: "invalid request" });
});
app.listen(5000, () => console.log("Server is running on port 5000"));
//# sourceMappingURL=index.js.map