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
exports.uploadFile = exports.uploadImage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const s3 = new client_s3_1.S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "AKIA4WBC3US5TQJQXSA4",
        secretAccessKey: "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",
    },
});
function uploadImage(file, name) {
    const uploadParams = {
        Bucket: "tts-scratch",
        Body: file.buffer,
        Key: name,
        ContentType: file.mimetype,
    };
    return s3.send(new client_s3_1.PutObjectCommand(uploadParams));
}
exports.uploadImage = uploadImage;
const uploadFile = (data, md5, assetType) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedImage = Buffer.from(data, "base64");
    try {
        const s3 = new aws_sdk_1.default.S3({
            region: "ap-south-1",
            accessKeyId: "AKIA4WBC3US5TQJQXSA4",
            secretAccessKey: "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",
        });
        yield s3
            .upload({
            Bucket: "tts-scratch",
            Key: md5,
            Body: decodedImage,
            ContentType: assetType,
            ContentEncoding: "base64",
        })
            .promise();
    }
    catch (e) {
        console.log(e);
    }
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=s3.js.map