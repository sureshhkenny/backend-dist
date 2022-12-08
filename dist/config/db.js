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
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const Asset_1 = __importDefault(require("../entities/Master/Asset"));
const Game_1 = __importDefault(require("../entities/Master/Game"));
const AssetUpload_1 = require("../entities/Master/AssetUpload");
const Course_1 = __importDefault(require("../entities/Course"));
const UProject_1 = __importDefault(require("../entities/Transaction/UProject"));
const Belt_1 = __importDefault(require("../entities/Master/Belt"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: "postgres",
            host: "schoolcode.chbbwydjh9iv.eu-west-2.rds.amazonaws.com",
            port: 5432,
            username: "postgres",
            password: "schoolcodeuser",
            database: "schoolcode",
            entities: [user_1.User, Course_1.default, Asset_1.default, Game_1.default, UProject_1.default, AssetUpload_1.AssetUpload, Belt_1.default],
            synchronize: true,
        });
        console.log("connected to global postgres");
    }
    catch (err) {
        console.log("Unable to connect\n", err);
    }
});
//# sourceMappingURL=db.js.map