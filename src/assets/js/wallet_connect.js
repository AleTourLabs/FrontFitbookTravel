import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors
} from 'https://unpkg.com/@web3modal/ethereum'

import { Web3Modal } from 'https://unpkg.com/@web3modal/html'

// Equivalent to importing from @wagmi/core
const { configureChains, createConfig, getAccount } = WagmiCore

// Equivalent to importing from @wagmi/core/chains
const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains

// Equivalent to importing from @wagmi/core/providers
const { CoinbaseWalletConnector } = WagmiCoreConnectors

// 1. Define constants
const projectId = "e7ad9f110adcbf20665d0b8f72e026ae";
if (!projectId) {
  throw new Error("You need to provide VITE_PROJECT_ID env variable");
}

const chains = [mainnet, polygon, avalanche, arbitrum];

// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  publicClient,
});

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);
const web3Modal = new Web3Modal(
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
console.log(getAccount());
// Función asincrónica para obtener la dirección de la wallet conectada
// async function getAddress() {
//   const provider = await web3Modal.connectTo('ethereum');
//   if (provider) {
//     const web3 = new Web3(provider);
//     const accounts = await web3.eth.getAccounts();
//     const address = accounts[0];

//     console.log('Dirección del usuario:', address);
//     return address;
//   } else {
//     console.log('El usuario no está conectado');
//     return null;
//   }
// }

// getAddress();

export default web3Modal;
