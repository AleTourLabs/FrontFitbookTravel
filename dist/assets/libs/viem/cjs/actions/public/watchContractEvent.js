"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchContractEvent = void 0;
const getAbiItem_js_1 = require("../../utils/abi/getAbiItem.js");
const observe_js_1 = require("../../utils/observe.js");
const poll_js_1 = require("../../utils/poll.js");
const stringify_js_1 = require("../../utils/stringify.js");
const createContractEventFilter_js_1 = require("./createContractEventFilter.js");
const getBlockNumber_js_1 = require("./getBlockNumber.js");
const getFilterChanges_js_1 = require("./getFilterChanges.js");
const getLogs_js_1 = require("./getLogs.js");
const uninstallFilter_js_1 = require("./uninstallFilter.js");
function watchContractEvent(client, { abi, address, args, batch = true, eventName, onError, onLogs, pollingInterval = client.pollingInterval, strict: strict_, }) {
    const observerId = (0, stringify_js_1.stringify)([
        'watchContractEvent',
        address,
        args,
        batch,
        client.uid,
        eventName,
        pollingInterval,
    ]);
    const strict = strict_ ?? false;
    return (0, observe_js_1.observe)(observerId, { onLogs, onError }, (emit) => {
        let previousBlockNumber;
        let filter;
        let initialized = false;
        const unwatch = (0, poll_js_1.poll)(async () => {
            if (!initialized) {
                try {
                    filter = (await (0, createContractEventFilter_js_1.createContractEventFilter)(client, {
                        abi,
                        address,
                        args,
                        eventName,
                        strict,
                    }));
                }
                catch { }
                initialized = true;
                return;
            }
            try {
                let logs;
                if (filter) {
                    logs = await (0, getFilterChanges_js_1.getFilterChanges)(client, { filter });
                }
                else {
                    const blockNumber = await (0, getBlockNumber_js_1.getBlockNumber)(client);
                    if (previousBlockNumber && previousBlockNumber !== blockNumber) {
                        logs = await (0, getLogs_js_1.getLogs)(client, {
                            address,
                            args,
                            fromBlock: previousBlockNumber + 1n,
                            toBlock: blockNumber,
                            event: (0, getAbiItem_js_1.getAbiItem)({
                                abi,
                                name: eventName,
                            }),
                        });
                    }
                    else {
                        logs = [];
                    }
                    previousBlockNumber = blockNumber;
                }
                if (logs.length === 0)
                    return;
                if (batch)
                    emit.onLogs(logs);
                else
                    logs.forEach((log) => emit.onLogs([log]));
            }
            catch (err) {
                emit.onError?.(err);
            }
        }, {
            emitOnBegin: true,
            interval: pollingInterval,
        });
        return async () => {
            if (filter)
                await (0, uninstallFilter_js_1.uninstallFilter)(client, { filter });
            unwatch();
        };
    });
}
exports.watchContractEvent = watchContractEvent;
//# sourceMappingURL=watchContractEvent.js.map