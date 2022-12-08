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
exports.createUser = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../entities/user");
const router = express_1.default.Router();
exports.createUser = router;
router.post("/api/signup", [
    (0, express_validator_1.check)("password", "password must be more than 6 characters").isLength({
        min: 6,
    }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const check = yield user_1.User.findOneBy({ username });
        if (!check) {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json({ errors: errors.array() });
            }
            const user = user_1.User.create({
                username,
                password: hashpassword,
            });
            yield user.save();
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: "2400s" });
            res.status(201).json({
                success: true,
                token,
                user_id: user.id,
                msg: "registered successfully",
            });
        }
        else {
            res.json({ success: false, msg: "user already exist" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, msg: "invalid request" });
    }
}));
router.post("/api/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.User.findOneBy({ username });
    if (!user) {
        return res.json({ success: false, msg: "Invalid credentials" });
    }
    try {
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (user.password && (yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(200).json({
                success: true,
                msg: "Successfully logged in",
                user_id: user.id,
                role: user.role,
                token,
            });
        }
        else {
            return res.json({
                success: false,
                msg: "Invalid credentials",
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, msg: "invalid request" });
    }
}));
router.get("/api", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ success: true, msg: "Welcome to Schoolcode api..." });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, msg: "invalid request" });
    }
}));
//# sourceMappingURL=createUser.js.map