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
exports.default = {
    asset_post: (file_name, file_type, md5_ext) => __awaiter(void 0, void 0, void 0, function* () {
        const url = `https://tts-scratch.s3.ap-south-1.amazonaws.com/${md5_ext}`;
        const asset = Asset_1.default.create({ file_type, file_name, md5_ext, url });
        yield asset.save();
    }),
};
//# sourceMappingURL=UserService.js.map