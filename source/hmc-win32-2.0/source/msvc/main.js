const native = require(process.argv.at(-1) || "");
const fs = require("fs");


(async function () {
    native.captureBmpToFile("D:/1.bmp",1920,50,600,600)
    fs.writeFileSync("D:/2.bmp",native.captureBmpToBuff(1920,50,600,600))
    
})();
process.exitCode = 666;
