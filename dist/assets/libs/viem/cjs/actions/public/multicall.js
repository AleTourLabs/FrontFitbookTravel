"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicall = void 0;
const abis_js_1 = require("../../constants/abis.js");
const abi_js_1 = require("../../errors/abi.js");
const contract_js_1 = require("../../errors/contract.js");
const decodeFunctionResult_js_1 = require("../../utils/abi/decodeFunctionResult.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const chain_js_1 = require("../../utils/chain.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const readContract_js_1 = require("./readContract.js");
async function multicall(client, args) {
    const { allowFailure = true, batchSize: batchSize_, blockNumber, blockTag, contracts: contracts_, multicallAddress: multicallAddress_, } = args;
    const batchSize = batchSize_ ??
        ((typeof client.batch?.multicall === 'object' &&
            client.batch.multicall.batchSize) ||
            1024);
    const contracts = contracts_;
    let multicallAddress = multicallAddress_;
    if (!multicallAddress) {
        if (!client.chain)
            throw new Error('client chain not configured. multicallAddress is required.');
        multicallAddress = (0, chain_js_1.getChainContractAddress)({
            blockNumber,
            chain: client.chain,
            contract: 'multicall3',
        });
    }
    const chunkedCalls = [[]];
    let currentChunk = 0;
    let currentChunkSize = 0;
    for (let i = 0; i < contracts.length; i++) {
        const { abi, address, args, functionName } = contracts[i];
        try {
            const callData = (0, encodeFunctionData_js_1.encodeFunctionData)({
                abi,
                args,
                functionName,
            });
            currentChunkSize += callData.length;
            if (batchSize > 0 && currentChunkSize > batchSize) {
                currentChunk++;
                currentChunkSize = (callData.length - 2) / 2;
                chunkedCalls[currentChunk] = [];
            }
            chunkedCalls[currentChunk] = [
                ...chunkedCalls[currentChunk],
                {
                    allowFailure: true,
                    callData,
                    target: address,
                },
            ];
        }
        catch (err) {
            const error = (0, getContractError_js_1.getContractError)(err, {
                abi,
                address,
                args,
                docsPath: '/docs/contract/multicall',
                functionName,
            });
            if (!allowFailure)
                throw error;
            chunkedCalls[currentChunk] = [
                ...chunkedCalls[currentChunk],
                {
                    allowFailure: true,
                    callData: '0x',
                    target: address,
                },
            ];
        }
    }
    const results = await Promise.all(chunkedCalls.map((calls) => (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.multicall3Abi,
        address: multicallAddress,
        args: [calls],
        blockNumber,
        blockTag,
        functionName: 'aggregate3',
    })));
    return results.flat().map(({ returnData, success }, i) => {
        const calls = chunkedCalls.flat();
        const { callData } = calls[i];
        const { abi, address, functionName, args } = contracts[i];
        try {
            if (callData === '0x')
                throw new abi_js_1.AbiDecodingZeroDataError();
            if (!success)
                throw new contract_js_1.RawContractError({ data: returnData });
            const result = (0, decodeFunctionResult_js_1.decodeFunctionResult)({
                abi,
                args,
                data: returnData,
                functionName: functionName,
            });
            return allowFailure ? { result, status: 'success' } : result;
        }
        catch (err) {
            const error = (0, getContractError_js_1.getContractError)(err, {
                abi,
                address,
                args,
                docsPath: '/docs/contract/multicall',
                functionName,
            });
            if (!allowFailure)
                throw error;
            return { error, result: undefined, status: 'failure' };
        }
    });
}
exports.multicall = multicall;
//# sourceMappingURL=multicall.js.map