"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeError = exports.containsNodeError = void 0;
const node_js_1 = require("../../errors/node.js");
const request_js_1 = require("../../errors/request.js");
const rpc_js_1 = require("../../errors/rpc.js");
function containsNodeError(err) {
    return (err instanceof rpc_js_1.TransactionRejectedRpcError ||
        err instanceof rpc_js_1.InvalidInputRpcError ||
        (err instanceof request_js_1.RpcRequestError && err.code === node_js_1.ExecutionRevertedError.code));
}
exports.containsNodeError = containsNodeError;
function getNodeError(err, args) {
    const message = err.details.toLowerCase();
    if (node_js_1.FeeCapTooHighError.nodeMessage.test(message))
        return new node_js_1.FeeCapTooHighError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
        });
    else if (node_js_1.FeeCapTooLowError.nodeMessage.test(message))
        return new node_js_1.FeeCapTooLowError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
        });
    else if (node_js_1.NonceTooHighError.nodeMessage.test(message))
        return new node_js_1.NonceTooHighError({ cause: err, nonce: args?.nonce });
    else if (node_js_1.NonceTooLowError.nodeMessage.test(message))
        return new node_js_1.NonceTooLowError({ cause: err, nonce: args?.nonce });
    else if (node_js_1.NonceMaxValueError.nodeMessage.test(message))
        return new node_js_1.NonceMaxValueError({ cause: err, nonce: args?.nonce });
    else if (node_js_1.InsufficientFundsError.nodeMessage.test(message))
        return new node_js_1.InsufficientFundsError({ cause: err });
    else if (node_js_1.IntrinsicGasTooHighError.nodeMessage.test(message))
        return new node_js_1.IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
    else if (node_js_1.IntrinsicGasTooLowError.nodeMessage.test(message))
        return new node_js_1.IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
    else if (node_js_1.TransactionTypeNotSupportedError.nodeMessage.test(message))
        return new node_js_1.TransactionTypeNotSupportedError({ cause: err });
    else if (node_js_1.TipAboveFeeCapError.nodeMessage.test(message))
        return new node_js_1.TipAboveFeeCapError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
            maxPriorityFeePerGas: args?.maxPriorityFeePerGas,
        });
    else if (message.match(node_js_1.ExecutionRevertedError.nodeMessage) ||
        ('code' in err.cause &&
            err.cause?.code === node_js_1.ExecutionRevertedError.code))
        return new node_js_1.ExecutionRevertedError({
            cause: err,
            message: err.cause.details || err.details,
        });
    return new node_js_1.UnknownNodeError({
        cause: err.cause.cause,
    });
}
exports.getNodeError = getNodeError;
//# sourceMappingURL=getNodeError.js.map