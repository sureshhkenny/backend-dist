"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = void 0;
const Use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.Use = Use;
//# sourceMappingURL=ErrorHandling.js.map