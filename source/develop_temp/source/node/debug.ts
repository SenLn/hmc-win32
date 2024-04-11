
import type _hmc = require("../../../mian/hmc");
import type { HMC } from "../../../mian/hmc";



export type Native = {
    startThread(): {
        promise: Promise<void>,
        id: number
    };
};

const native: _hmc.HMC.G_HMC_NATIVE & HMC.Native & Native = require(process.argv.at(-1) || "");


(async function () {

    for (let index = 0; index<50; index++) {
        const data = native.startThread();
        console.log(data, data?.id, data?.promise);
    }

})();

process.exitCode = 666;
