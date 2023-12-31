import { BytesSizeMismatchError } from '../errors/abi.js';
import { InvalidAddressError } from '../errors/address.js';
import { isAddress } from './address/isAddress.js';
import { size } from './data/size.js';
import { numberToHex } from './encoding/toHex.js';
import { bytesRegex, integerRegex } from './regex.js';
export function validateTypedData({ domain, message, primaryType, types: types_, }) {
    const types = types_;
    const validateData = (struct, value_) => {
        for (const param of struct) {
            const { name, type: type_ } = param;
            const type = type_;
            const value = value_[name];
            const integerMatch = type.match(integerRegex);
            if (integerMatch &&
                (typeof value === 'number' || typeof value === 'bigint')) {
                const [_type, base, size_] = integerMatch;
                // If number cannot be cast to a sized hex value, it is out of range
                // and will throw.
                numberToHex(value, {
                    signed: base === 'int',
                    size: parseInt(size_) / 8,
                });
            }
            if (type === 'address' && typeof value === 'string' && !isAddress(value))
                throw new InvalidAddressError({ address: value });
            const bytesMatch = type.match(bytesRegex);
            if (bytesMatch) {
                const [_type, size_] = bytesMatch;
                if (size_ && size(value) !== parseInt(size_))
                    throw new BytesSizeMismatchError({
                        expectedSize: parseInt(size_),
                        givenSize: size(value),
                    });
            }
            const struct = types[type];
            if (struct)
                validateData(struct, value);
        }
    };
    // Validate domain types.
    if (types['EIP712Domain'] && domain)
        validateData(types['EIP712Domain'], domain);
    if (primaryType !== 'EIP712Domain') {
        // Validate message types.
        const type = types[primaryType];
        validateData(type, message);
    }
}
//# sourceMappingURL=typedData.js.map