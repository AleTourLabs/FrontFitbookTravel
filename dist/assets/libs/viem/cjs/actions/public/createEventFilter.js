"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventFilter = void 0;
const encodeEventTopics_js_1 = require("../../utils/abi/encodeEventTopics.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const createFilterRequestScope_js_1 = require("../../utils/filters/createFilterRequestScope.js");
async function createEventFilter(client, { address, args, event, fromBlock, strict, toBlock, } = {}) {
    const getRequest = (0, createFilterRequestScope_js_1.createFilterRequestScope)(client, {
        method: 'eth_newFilter',
    });
    let topics = [];
    if (event)
        topics = (0, encodeEventTopics_js_1.encodeEventTopics)({
            abi: [event],
            eventName: event.name,
            args,
        });
    const id = await client.request({
        method: 'eth_newFilter',
        params: [
            {
                address,
                fromBlock: typeof fromBlock === 'bigint' ? (0, toHex_js_1.numberToHex)(fromBlock) : fromBlock,
                toBlock: typeof toBlock === 'bigint' ? (0, toHex_js_1.numberToHex)(toBlock) : toBlock,
                ...(topics.length ? { topics } : {}),
            },
        ],
    });
    return {
        abi: event ? [event] : undefined,
        args,
        eventName: event ? event.name : undefined,
        id,
        request: getRequest(id),
        strict,
        type: 'event',
    };
}
exports.createEventFilter = createEventFilter;
//# sourceMappingURL=createEventFilter.js.map