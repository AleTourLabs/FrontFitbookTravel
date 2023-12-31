import { EstimateGasExecutionError } from '../../errors/estimateGas.js';
import { containsNodeError, getNodeError, } from './getNodeError.js';
export function getEstimateGasError(err, { docsPath, ...args }) {
    let cause = err;
    if (containsNodeError(err))
        cause = getNodeError(err, args);
    return new EstimateGasExecutionError(cause, {
        docsPath,
        ...args,
    });
}
//# sourceMappingURL=getEstimateGasError.js.map