"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userToken_1 = require("../middleware/userToken");
const GameController_1 = __importDefault(require("../controller/GameController"));
const ErrorHandling_1 = require("../middleware/ErrorHandling");
const Student = (0, express_1.Router)();
Student.use(userToken_1.auth);
Student.use(userToken_1.auth);
Student.get("/course", (0, ErrorHandling_1.Use)(GameController_1.default.courseGet));
Student.get("/game/:course_id", (0, ErrorHandling_1.Use)(GameController_1.default.gameGet));
Student.get("/game/:game_id/load", (0, ErrorHandling_1.Use)(GameController_1.default.gameSingleJson));
Student.get("/game/:game_id/data", (0, ErrorHandling_1.Use)(GameController_1.default.gameSingle));
Student.post("/u_game/:game_id", (0, ErrorHandling_1.Use)(GameController_1.default.userGamePost));
Student.get("/u_game/:game_id", (0, ErrorHandling_1.Use)(GameController_1.default.userGameGet));
Student.get("/u_game", (0, ErrorHandling_1.Use)(GameController_1.default.userGameAll));
Student.get("/u_game/:u_game_id/load", (0, ErrorHandling_1.Use)(GameController_1.default.userGameSingle));
Student.get("/u_game/:u_game_id/data", (0, ErrorHandling_1.Use)(GameController_1.default.userGameData));
Student.put("/u_game/:u_game_id", (0, ErrorHandling_1.Use)(GameController_1.default.userGameUpdate));
Student.get("/project/:project_id", (0, ErrorHandling_1.Use)(GameController_1.default.projectSingle));
Student.post("/master/asset/upload", (0, ErrorHandling_1.Use)(GameController_1.default.addAsset));
exports.default = Student;
//# sourceMappingURL=StudentRoute.js.map