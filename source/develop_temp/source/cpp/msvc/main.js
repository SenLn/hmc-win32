"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native = require(process.argv.at(-1) || "");
(async function () {
    for (let index = 0; index < 50; index++) {
        const data = native.startThread();
        console.log(data, data === null || data === void 0 ? void 0 : data.id, data === null || data === void 0 ? void 0 : data.promise);
    }
})();
process.exitCode = 666;
