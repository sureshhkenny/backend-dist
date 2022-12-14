"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GameController_1 = __importDefault(require("../controller/GameController"));
const games = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
games.post("/course", GameController_1.default.coursePost);
games.get("/course", GameController_1.default.courseGet);
games.post("/game/:course_id", GameController_1.default.gamePost);
games.put("/game/:game_id", GameController_1.default.gameUpdate);
games.get("/game/:course_id", GameController_1.default.gameGet);
games.get("/game/:game_id/load", GameController_1.default.gameSingle);
games.post("/u_game/:game_id", GameController_1.default.userGamePost);
games.get("/u_game/:game_id", GameController_1.default.userGameGet);
games.get("/u_game", GameController_1.default.userGameAll);
games.get("/u_game/:u_game_id/load", GameController_1.default.userGameSingle);
games.put("/u_game/:u_game_id", GameController_1.default.userGameUpdate);
games.get("/project/:project_id", GameController_1.default.projectSingle);
games.post("/asset", upload.single("file"), GameController_1.default.asset_post);
games.post("/assets", upload.array("files", 10), GameController_1.default.assets_post);
games.get("/asset", GameController_1.default.asset_read);
games.get("/asset/:asset_id", GameController_1.default.asset_get);
games.post("/asset/upload", GameController_1.default.add_asset);
exports.default = games;
//# sourceMappingURL=Game.js.map