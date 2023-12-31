import { createClient } from './createClient.js';
import { testActions } from './decorators/test.js';
/**
 * @description Creates a test client with a given transport.
 */
/**
 * Creates a Test Client with a given [Transport](https://viem.sh/docs/clients/intro.html) configured for a [Chain](https://viem.sh/docs/clients/chains.html).
 *
 * - Docs: https://viem.sh/docs/clients/test.html
 *
 * A Test Client is an interface to "test" JSON-RPC API methods accessible through a local Ethereum test node such as [Anvil](https://book.getfoundry.sh/anvil/) or [Hardhat](https://hardhat.org/) such as mining blocks, impersonating accounts, setting fees, etc through [Test Actions](https://viem.sh/docs/actions/test/introduction.html).
 *
 * @param config - {@link TestClientConfig}
 * @returns A Test Client. {@link TestClient}
 *
 * @example
 * import { createTestClient, custom } from 'viem'
 * import { foundry } from 'viem/chains'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: foundry,
 *   transport: http(),
 * })
 */
export function createTestClient({ account, chain, key = 'test', name = 'Test Client', mode, pollingInterval, transport, }) {
    return createClient({
        account,
        chain,
        key,
        name,
        pollingInterval,
        transport,
        type: 'testClient',
    })
        .extend(() => ({ mode }))
        .extend(testActions({ mode }));
}
//# sourceMappingURL=createTestClient.js.map