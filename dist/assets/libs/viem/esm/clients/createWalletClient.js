import { createClient } from './createClient.js';
import { walletActions } from './decorators/wallet.js';
/**
 * Creates a Wallet Client with a given [Transport](https://viem.sh/docs/clients/intro.html) configured for a [Chain](https://viem.sh/docs/clients/chains.html).
 *
 * - Docs: https://viem.sh/docs/clients/wallet.html
 *
 * A Wallet Client is an interface to interact with [Ethereum Account(s)](https://ethereum.org/en/glossary/#account) and provides the ability to retrieve accounts, execute transactions, sign messages, etc. through [Wallet Actions](https://viem.sh/docs/actions/wallet/introduction.html).
 *
 * The Wallet Client supports signing over:
 * - [JSON-RPC Accounts](https://viem.sh/docs/clients/wallet.html#json-rpc-accounts) (e.g. Browser Extension Wallets, WalletConnect, etc).
 * - [Local Accounts](https://viem.sh/docs/clients/wallet.html#local-accounts-private-key-mnemonic-etc) (e.g. private key/mnemonic wallets).
 *
 * @param config - {@link WalletClientConfig}
 * @returns A Wallet Client. {@link WalletClient}
 *
 * @example
 * // JSON-RPC Account
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 *
 * @example
 * // Local Account
 * import { createWalletClient, custom } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…')
 *   chain: mainnet,
 *   transport: http(),
 * })
 */
export function createWalletClient({ account, chain, transport, key = 'wallet', name = 'Wallet Client', pollingInterval, }) {
    return createClient({
        account,
        chain,
        key,
        name,
        pollingInterval,
        transport: (opts) => transport({ ...opts, retryCount: 0 }),
        type: 'walletClient',
    }).extend(walletActions);
}
//# sourceMappingURL=createWalletClient.js.map