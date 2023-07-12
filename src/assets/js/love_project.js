
import {
    EthereumClient,
    w3mConnectors,
    WagmiCore,
    WagmiCoreChains,
    w3mProvider
} from 'https://unpkg.com/@web3modal/ethereum'

// Equivalent to importing from @wagmi/core
const { configureChains, createConfig, getAccount } = WagmiCore

// Equivalent to importing from @wagmi/core/chains
const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains

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

// Obtén los parámetros de la cadena de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);

// Lee el valor del parámetro 'project_id'
const project_id = urlParams.get('project_id');

// Assuming you have a reference to the "Love Project" element with id "love_project"
const loveProjectElement = document.getElementById('love_project');

// Add click event listener to the element
loveProjectElement.addEventListener('click', async () => {
    const voteValue = 5; // Replace with the desired vote value

    if (getAccount().isConnected) {
        // Check if the address is already registered
        fetch(`https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/${getAccount().address}/address`)
            .then(response => response.json())
            .then(async data => {
                console.log(data.data.length);
                if (data.data.length !== 0) {
                    // Address already registered, do not send the request again
                    console.log('Address already registered:', getAccount().address);
                    const userId = data.data[0].user_id;
                    // Prepare the data to be sent in the request body

                    const voteData = {
                        value: voteValue,
                        user_id: userId
                    };

                    // Send the POST request
                    await fetch(`https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${project_id}/votes`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': 'https://fitbooktravel2.tourfeelinglabs.com/dist/',
                            'Access-Control-Request-Method': 'POST'
                        },
                        body: JSON.stringify(voteData)
                    })
                        .then(response => response.json())
                        .then(async data => {
                            if (data.status === "OK") {

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Thanks for participate in the project'
                                });
                                await fetch(`https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${data.data.insertId}/vote`)
                                    .then(response => response.json())
                                    .then(async data => {
                                        const vote_section = document.getElementById('votes_projects');

                                        const userVote = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/${data.data[0].user_id}`;
                                        const responseUserVote = await fetch(userVote);
                                        const resultUserVote = await responseUserVote.json();


                                        const newVoteHTML = `
                                        <div class="flex items-center gap-3 border-t px-3 py-[14px] !border-0"
                                        data-testid="proposal-votes-list-item-0">
                                        <div data-headlessui-state=""><button id="headlessui-popover-button-516"
                                                type="button" aria-expanded="false" data-headlessui-state=""><a
                                                    href="#/profile/0xCff5be1cf3C7Cfe073Ade82d1dC27be33c998D6e"
                                                    class="whitespace-nowrap" tabindex="-1">
                                                    <div
                                                        class="w-[110px] min-w-[110px] xs:w-[130px] xs:min-w-[130px] text-left flex flex-nowrap items-center space-x-1">
                                                        <span class="flex shrink-0 items-center justify-center"><img
                                                                class="rounded-full bg-skin-border object-cover"
                                                                alt="avatar"
                                                                style="width: 18px; height: 18px; min-width: 18px; display: none;"><img
                                                                src="https://cdn.stamp.fyi/avatar/eth:${resultUserVote.data[0].address_wallet}"
                                                                class="rounded-full bg-skin-border object-cover"
                                                                alt="avatar"
                                                                style="width: 18px; height: 18px; min-width: 18px;">
                                                        </span><span
                                                            class="w-full cursor-pointer truncate text-skin-link">${resultUserVote.data[0].address_wallet}</span>
                                                    </div>
                                                </a></button>
                                        </div>
                                        <div class="flex-auto truncate px-2 text-center text-skin-link">
                                            <div class="truncate text-end text-skin-link">Love it <i
                                                    class="mdi mdi-heart btn btn-icon text-lg bg-white dark:bg-slate-900 border-0 shadow dark:shadow-gray-800 rounded-full text-red-600/20 text-red-700 "></i>
                                            </div>
                                        </div>
                                    </div>`;
                                        vote_section.insertAdjacentHTML('afterbegin', newVoteHTML);


                                        const numVotesUrl = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${project_id}/num_votes`;
                                        const responseNumVotes = await fetch(numVotesUrl);
                                        const resultNumVotes = await responseNumVotes.json();

                                        const total_votes = `
                                        <div
                                            class="group flex h-[57px] justify-between rounded-t-none border-b border-skin-border px-4 pb-[12px] pt-3 md:rounded-t-lg">
                                            <h4 class="flex items-center">
                                                <div class="font-semibold hover:text-indigo-600">Votes <span class="text-sm text-slate-400 px-2"> ${resultNumVotes.data[0].votes}</span></div>
                                            </h4>
                                            <div class="flex items-center">
                                    
                                            </div>
                                        </div>`;
                                        vote_section.insertAdjacentHTML('afterbegin', total_votes);
                                    })
                                // Add any additional logic you want to perform after the vote is submitted successfully
                            } else {
                                console.error('Error submitting vote');
                                // Add any error handling logic here
                            }
                        })
                        .catch(error => {
                            console.error('Error submitting vote', error);
                            // Add any error handling logic here
                        });
                    // Realiza la solicitud AJAX utilizando la biblioteca Fetch API
                    return;
                }
            })
    }
});
