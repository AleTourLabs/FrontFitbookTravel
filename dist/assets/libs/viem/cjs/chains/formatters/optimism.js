"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimismFormatters = void 0;
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
const block_js_1 = require("../../utils/formatters/block.js");
const transaction_js_1 = require("../../utils/formatters/transaction.js");
exports.optimismFormatters = {
    block: (0, block_js_1.defineBlock)({
        format(args) {
            const transactions = args.transactions?.map((transaction) => {
                if (typeof transaction === 'string')
                    return transaction;
                const formatted = (0, transaction_js_1.formatTransaction)(transaction);
                if (formatted.typeHex === '0x7e') {
                    formatted.isSystemTx = transaction.isSystemTx;
                    formatted.mint = transaction.mint
                        ? (0, fromHex_js_1.hexToBigInt)(transaction.mint)
                        : undefined;
                    formatted.sourceHash = transaction.sourceHash;
                    formatted.type = 'deposit';
                }
                return formatted;
            });
            return {
                transactions,
            };
        },
    }),
    transaction: (0, transaction_js_1.defineTransaction)({
        format(args) {
            const transaction = {};
            if (args.type === '0x7e') {
                transaction.isSystemTx = args.isSystemTx;
                transaction.mint = args.mint ? (0, fromHex_js_1.hexToBigInt)(args.mint) : undefined;
                transaction.sourceHash = args.sourceHash;
                transaction.type = 'deposit';
            }
            return transaction;
        },
    }),
};
//# sourceMappingURL=optimism.js.map