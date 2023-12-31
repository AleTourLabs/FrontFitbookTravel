import { TransactionExecutionError } from '../../errors/transaction.js';
import { containsNodeError, getNodeError, } from './getNodeError.js';
export function getTransactionError(err, { docsPath, ...args }) {
    let cause = err;
    if (containsNodeError(err))
        cause = getNodeError(err, args);
    return new TransactionExecutionError(cause, {
        docsPath,
        ...args,
    });
}
//# sourceMappingURL=getTransactionError.js.map