"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnsAddress = void 0;
const abis_js_1 = require("../../constants/abis.js");
const contract_js_1 = require("../../errors/contract.js");
const decodeFunctionResult_js_1 = require("../../utils/abi/decodeFunctionResult.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const chain_js_1 = require("../../utils/chain.js");
const trim_js_1 = require("../../utils/data/trim.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const namehash_js_1 = require("../../utils/ens/namehash.js");
const packetToBytes_js_1 = require("../../utils/ens/packetToBytes.js");
const readContract_js_1 = require("../public/readContract.js");
async function getEnsAddress(client, { blockNumber, blockTag, name, universalResolverAddress: universalResolverAddress_, }) {
    let universalResolverAddress = universalResolverAddress_;
    if (!universalResolverAddress) {
        if (!client.chain)
            throw new Error('client chain not configured. universalResolverAddress is required.');
        universalResolverAddress = (0, chain_js_1.getChainContractAddress)({
            blockNumber,
            chain: client.chain,
            contract: 'ensUniversalResolver',
        });
    }
    try {
        const res = await (0, readContract_js_1.readContract)(client, {
            address: universalResolverAddress,
            abi: abis_js_1.universalResolverAbi,
            functionName: 'resolve',
            args: [
                (0, toHex_js_1.toHex)((0, packetToBytes_js_1.packetToBytes)(name)),
                (0, encodeFunctionData_js_1.encodeFunctionData)({
                    abi: abis_js_1.singleAddressResolverAbi,
                    functionName: 'addr',
                    args: [(0, namehash_js_1.namehash)(name)],
                }),
            ],
            blockNumber,
            blockTag,
        });
        if (res[0] === '0x')
            return null;
        const address = (0, decodeFunctionResult_js_1.decodeFunctionResult)({
            abi: abis_js_1.singleAddressResolverAbi,
            functionName: 'addr',
            data: res[0],
        });
        return (0, trim_js_1.trim)(address) === '0x00' ? null : address;
    }
    catch (err) {
        if (err instanceof contract_js_1.ContractFunctionExecutionError) {
            const reason = err.cause?.reason;
            if (reason?.includes('Wildcard on non-extended resolvers is not supported'))
                return null;
        }
        throw err;
    }
}
exports.getEnsAddress = getEnsAddress;
//# sourceMappingURL=getEnsAddress.js.map