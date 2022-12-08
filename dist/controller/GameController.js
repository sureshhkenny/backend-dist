"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../entities/Master/Asset"));
const s3_1 = require("../middleware/s3");
const UserService_1 = __importDefault(require("../services/UserService"));
const AssetUpload_1 = require("../entities/Master/AssetUpload");
const Course_1 = __importDefault(require("../entities/Course"));
const Game_1 = __importDefault(require("../entities/Master/Game"));
const UProject_1 = __importDefault(require("../entities/Transaction/UProject"));
const user_1 = require("../entities/user");
const Belt_1 = __importDefault(require("../entities/Master/Belt"));
exports.default = {
    coursePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        const course = Course_1.default.create({ name });
        yield course.save();
        res.json({ success: true, msg: "course added successfully" });
    }),
    courseGet: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield Course_1.default.find({ order: { created_on: "ASC" } });
        res.json({ success: true, courses });
    }),
    beltAdd: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        const belt = Belt_1.default.create({ name });
        yield belt.save();
        res.json({ success: true, msg: "belt added successfully" });
    }),
    beltGet: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const belt = yield Belt_1.default.find();
        res.json({ success: true, belt });
    }),
    gamePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { course_id } = req.params;
        const { name, stage, thumnail_url, json, belt_id } = req.body;
        const course = yield Course_1.default.findOneById(course_id);
        const stage_number = stage.split("-");
        if (!course) {
            res.json({ success: false, msg: "course not found" });
        }
        else {
            const game = Game_1.default.create({
                course_id,
                name,
                stage,
                stage_number: stage_number[0],
                level: stage_number[1] ? stage_number[1] : 1,
                thumnail_url,
                json,
                belt_id,
            });
            yield game.save();
            res.json({ success: true, game, msg: "game added successfully" });
        }
    }),
    gameUpdate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { game_id } = req.params;
        const game = yield Game_1.default.findOneById(game_id);
        if (!game) {
            res.json({ success: false, msg: "game not found" });
        }
        else {
            const update = yield Game_1.default.merge(game, req.body);
            yield update.save();
            res.json({ success: true, msg: "game updated successfully" });
        }
    }),
    gameGet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { course_id } = req.params;
        const user_id = res.getHeader("userId");
        const games = yield Game_1.default.find({
            where: { course_id },
            order: { stage: "ASC" },
            relations: ["belt"],
        });
        if (games.length == 0 || !user_id) {
            res.json({ success: false, msg: "no games found" });
        }
        else {
            for (let i = 0; i < games.length; i++) {
                const ug = yield UProject_1.default.findOneBy({
                    user_id,
                    game_id: games[i].id,
                });
                if (!ug || games[i].belt_id != "fe412b49-5aca-4147-84a5-3adf99dfe7d7") {
                    games[i]["status"] = false;
                }
                else {
                    games[i]["status"] = true;
                }
                if (games[i].belt_id == "fe412b49-5aca-4147-84a5-3adf99dfe7d7" &&
                    games[i].stage == "01-01") {
                    games[i]["status"] = true;
                }
            }
            res.json({ success: true, games });
        }
    }),
    adminGame: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { course_id } = req.params;
        const games = yield Game_1.default.find({
            where: { course_id },
            order: { stage: "ASC" },
            relations: ["belt"],
        });
        res.json({ success: true, games });
    }),
    gameSingleJson: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { game_id } = req.params;
        const game = yield Game_1.default.findOneById(game_id);
        if (!game) {
            res.json({ success: false, msg: "game not found" });
        }
        else {
            res.send(game.json);
        }
    }),
    gameSingle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { game_id } = req.params;
        const game = yield Game_1.default.findOneById(game_id);
        if (!game) {
            res.json({ success: false, msg: "game not found" });
        }
        else {
            res.json({ success: true, game });
        }
    }),
    userGamePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { game_id } = req.params;
        const { user_id, json, name } = req.body;
        const game = yield Game_1.default.findOneById(game_id);
        const ug = yield UProject_1.default.findOneBy({ user_id, game_id });
        const user = yield user_1.User.findOneById(user_id);
        if (!game || !user) {
            res.json({ success: false, msg: "game or user not found" });
        }
        else {
            if (!ug) {
                const userGame = UProject_1.default.create({ user_id, game_id, json, name });
                yield userGame.save();
                res.json({
                    success: true,
                    msg: "game created successfully",
                    userGame,
                });
            }
            else {
                const update = yield UProject_1.default.merge(ug, req.body, { json: ug.json });
                yield update.save();
                res.json({ success: true, msg: "game updated successfully", update });
            }
        }
    }),
    userGameGet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { game_id } = req.params;
        const game = yield UProject_1.default.findBy({ game_id });
        if (!game) {
            res.json({ success: false, msg: "game not found" });
        }
        else {
            res.json({ success: true, game });
        }
    }),
    userGameAll: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield UProject_1.default.find();
        if (!game) {
            res.json({ success: false, msg: "game not found" });
        }
        else {
            res.json({ success: true, game });
        }
    }),
    userGameSingle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { u_game_id } = req.params;
        const userGame = yield UProject_1.default.findOneById(u_game_id);
        if (!u_game_id) {
            res.json({ success: false, msg: "game not found" });
        }
        else {
            res.send(userGame === null || userGame === void 0 ? void 0 : userGame.json);
        }
    }),
    userGameData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { u_game_id } = req.params;
        const userGame = yield UProject_1.default.findOneById(u_game_id);
        if (!u_game_id) {
            res.json({ success: false, msg: "game not found" });
        }
        else {
            res.json({ success: true, userGame });
        }
    }),
    userGameUpdate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { u_game_id } = req.params;
        const ug = yield UProject_1.default.findOneById(u_game_id);
        if (!u_game_id) {
            res.json({ success: false, msg: "game not found" });
        }
        else {
            if ((req.body.json == (ug === null || ug === void 0 ? void 0 : ug.json) && (ug === null || ug === void 0 ? void 0 : ug.status) == false) ||
                (ug === null || ug === void 0 ? void 0 : ug.status) == true) {
                const update = yield UProject_1.default.merge(ug, req.body);
                yield update.save();
            }
            else {
                const update = yield UProject_1.default.merge(ug, req.body, {
                    status: true,
                });
                yield update.save();
                let belt_id = "fe412b49-5aca-4147-84a5-3adf99dfe7d7";
                const current = yield Game_1.default.findOneBy({
                    id: ug === null || ug === void 0 ? void 0 : ug.game_id,
                    belt_id,
                });
                const nextStage = parseInt(`${current === null || current === void 0 ? void 0 : current.stage_number}`) + 1;
                const nextGame1 = yield Game_1.default.findOneBy({
                    level: current === null || current === void 0 ? void 0 : current.level,
                    stage_number: nextStage,
                    belt_id,
                });
                if (!nextGame1) {
                    const nextLevel = parseInt(`${current === null || current === void 0 ? void 0 : current.level}`) + 1;
                    const nextGame2 = yield Game_1.default.findOneBy({
                        level: nextLevel,
                        stage_number: 1,
                        belt_id,
                    });
                    const check = yield UProject_1.default.findOneBy({
                        game_id: nextGame2 === null || nextGame2 === void 0 ? void 0 : nextGame2.id,
                        user_id: ug === null || ug === void 0 ? void 0 : ug.user_id,
                    });
                    if (!check) {
                        const next_game = UProject_1.default.create({
                            user_id: ug === null || ug === void 0 ? void 0 : ug.user_id,
                            game_id: nextGame2 === null || nextGame2 === void 0 ? void 0 : nextGame2.id,
                            json: nextGame2 === null || nextGame2 === void 0 ? void 0 : nextGame2.json,
                        });
                        yield next_game.save();
                    }
                }
                else {
                    const check = yield UProject_1.default.findOneBy({
                        game_id: nextGame1.id,
                        user_id: ug === null || ug === void 0 ? void 0 : ug.user_id,
                    });
                    if (!check) {
                        const next_game = UProject_1.default.create({
                            user_id: ug === null || ug === void 0 ? void 0 : ug.user_id,
                            game_id: nextGame1.id,
                            json: nextGame1.json,
                        });
                        yield next_game.save();
                    }
                }
            }
            res.json({ success: true, msg: "user game updated successfully" });
        }
    }),
    projectSingle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { project_id } = req.params;
        const project = yield Game_1.default.findOneById(project_id);
        if (!project) {
            res.json({ success: false, msg: "no project found" });
        }
        else {
            res.send(project.json);
        }
    }),
    assetPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const file = req.file;
        const { assetId, dataFormat } = req.body;
        const name = `${assetId}.${dataFormat}`;
        UserService_1.default.asset_post(assetId, dataFormat, name);
        yield (0, s3_1.uploadImage)(file, name);
        res.json({ success: true, msg: "asset added successfully" });
    }),
    assetsPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const file = req.files;
        const { assetId, dataFormat } = req.body;
        const name = `${assetId}.${dataFormat}`;
        UserService_1.default.asset_post(assetId, dataFormat, name);
        yield (0, s3_1.uploadImage)(file, name);
        res.json({ success: true, msg: "asset added successfully" });
    }),
    assetGet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { asset_id } = req.params;
        const asset = yield Asset_1.default.findBy({ md5_ext: asset_id });
        if (!asset) {
            res.json({ success: false, msg: "asset not found" });
        }
        else {
            res.json({ success: true, asset });
        }
    }),
    assetRead: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const asset = yield Asset_1.default.find();
        res.json({ success: true, asset });
    }),
    projectUpdate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { project_id } = req.params;
        const project = yield Game_1.default.findOneById(project_id);
        if (!project) {
            res.json({ success: false, msg: "project not found" });
        }
        else {
            const update = yield Game_1.default.merge(project, req.body);
            yield update.save();
            res.json({ success: true, msg: "project updated successfully" });
        }
    }),
    addAsset: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { assetId, assetType, data, dataFormat } = req.body;
        const md5 = `${assetId}.${dataFormat}`;
        const url = `https://tts-scratch.s3.ap-south-1.amazonaws.com/${md5}`;
        const asset = AssetUpload_1.AssetUpload.create({
            assetId,
            assetType,
            url,
            dataFormat,
            md5,
        });
        yield (0, s3_1.uploadFile)(data, md5, assetType);
        yield asset.save();
        res.json({ success: true, msg: "Asset added successfully" });
    }),
};
//# sourceMappingURL=GameController.js.map