import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";

import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";

// 0. Import wagmi dependencies
const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains;
const { configureChains, createConfig } = WagmiCore;

// 1. Define chains
const chains = [mainnet, polygon, avalanche, arbitrum];
const projectId = "e7ad9f110adcbf20665d0b8f72e026ae";

// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ chains, version: 2, projectId }),
    new WagmiCoreConnectors.CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Fitbook Travel",
      },
    }),
  ],
  publicClient,
});

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
    },
  },
  ethereumClient
);


web3Modal.setTheme({
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Nunito, sans-serif',
    '--w3m-accent-color': '#4F46E5',
    '--w3m-button-border-radius': '24px'
    // ...
  }
});

