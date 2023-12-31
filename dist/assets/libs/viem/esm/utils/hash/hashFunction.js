import { extractFunctionName, extractFunctionParams, } from '../contract/extractFunctionParts.js';
import { toBytes } from '../encoding/toBytes.js';
import { keccak256 } from './keccak256.js';
const hash = (value) => keccak256(toBytes(value));
export function hashFunction(def) {
    const name = extractFunctionName(def);
    const params = extractFunctionParams(def) || [];
    return hash(`${name}(${params.map(({ type }) => type).join(',')})`);
}
export function hashAbiItem(def) {
    return hash(`${def.name}(${def.inputs.map(({ type }) => type).join(',')})`);
}
//# sourceMappingURL=hashFunction.js.map