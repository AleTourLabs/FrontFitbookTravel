
import {
    EthereumClient,
    w3mConnectors,
    WagmiCore,
    WagmiCoreChains,
    w3mProvider
} from 'https://unpkg.com/@web3modal/ethereum'

// Equivalent to importing from @wagmi/core
const { configureChains, createConfig, watchAccount } = WagmiCore

// Equivalent to importing from @wagmi/core/chains
const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    color: '#716add',
    background: '#fff url(/images/trees.png)',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
const chains = [mainnet, polygon, avalanche, arbitrum];
const projectId = "7405e60a53749d70dc54f78985300bec";
if (!projectId) {
    throw new Error("You need to provide VITE_PROJECT_ID env variable");
}

// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ chains, version: 1, projectId }),
    publicClient,
});
await new EthereumClient(wagmiConfig, chains);

let firstExecution = true;
const unwatch = watchAccount((account) => {
    console.log(account);
    if (account.isConnected) {
        const user_account = {
            address_wallet: account.address
        };

        // Check if the address is already registered
        fetch(`https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/${account.address}/address`)
            .then(response => response.json())
            .then(data => {
                console.log(data.data.length);
                if (data.data.length !== 0) {
                    // Address already registered, do not send the request again
                    if (firstExecution) {
                        Toast.fire({
                            icon: 'success',
                            title: 'Session started successfully'
                        });
                        firstExecution = false;
                    }
                    console.log('Address already registered:', account.address);
                    return;
                }

                // Address not registered, send the registration request
                fetch('https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'https://fitbooktravel2.tourfeelinglabs.com/dist/',
                        'Access-Control-Request-Method': 'POST'
                    },
                    body: JSON.stringify(user_account)
                })
                    .then(response => {
                        if (response.ok) {
                            // Request sent successfully
                            if (firstExecution) {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Signed up successfully'
                                });
                                firstExecution = false;
                            }
                            console.log('Request sent successfully');
                            return;
                        } else {
                            // Error sending the request
                            Toast.fire({
                                icon: 'error',
                                title: 'Error signing up'
                            });
                            console.error('Error sending the request');
                        }
                    })
                    .catch(error => {
                        // Error in the AJAX request
                        console.error('Error in the AJAX request', error);
                    });
            })
            .catch(error => {
                // Error retrieving the registration status
                console.error('Error retrieving the registration status', error);
            });
        if (account.isDisconnected) {
            unwatch();
        }
    }
});
