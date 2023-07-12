
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

const apiUrl = 'https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/?project_publish=1';

function fetchDataAndRender() {
  try {
    document.addEventListener("DOMContentLoaded", async function (event) {
      const response = await fetch(apiUrl);
      const result = await response.json();
      const data = result.data;

      const container = document.getElementById('principal_projects');

      data.slice(0, 4).forEach(async (item) => {
        const numCommentsUrl = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${item.project_id}/num_comments`;
        const responseComments = await fetch(numCommentsUrl);
        const resultComments = await responseComments.json();

        const numVotesUrl = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${item.project_id}/num_votes`;
        const responseVotes = await fetch(numVotesUrl);
        const resultVotes = await responseVotes.json();

        const paragraph = `
        <div class="group blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden">
          <div class="relative">
            <img src="assets/images/nft/items/21.jpg" alt="">
            <div class="absolute end-0 top-0 mt-6 me-6 opacity-0 group-hover:opacity-100 duration-500 ease-in-out">
              <a href="#!" class="btn btn-icon text-lg bg-white dark:bg-slate-900 border-0 shadow dark:shadow-gray-800 rounded-full text-red-600/20 hover:text-red-600 focus:text-red-600">
                <i class="mdi mdi-heart"></i>
              </a>
            </div>
          </div>
          <div class="content p-6">
            <p class="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out" id="title_project_${item.project_id}">${item.title}</p>
            <p class="text-slate-400 mt-3">${item.description}</p>
            <div class="mt-4">
              <p class="btn btn-link font-normal hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out" id="read_more_project_${item.project_id}">
                Read More <i class="uil uil-arrow-right"></i>
              </p>
            </div>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center">
                <span class="block font-normal hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">
                  <span class="text-slate-400">${resultComments.data[0].comments} </span>
                  <i class="mdi mdi-comment-text-multiple-outline"></i>
                </span>
              </div>
              <div>
                <span class="text-slate-400">${(resultVotes.data[0].votes === null) ? 0 : resultVotes.data[0].votes} <i class="mdi mdi-heart text-red-600"></i></span>
              </div>
            </div>
          </div>
        </div>`;

        container.innerHTML += paragraph;
        // Agregar los event listeners a todos los elementos
        document.querySelectorAll('[id^="title_project_"]').forEach((element) => {
          element.addEventListener('click', () => handleItemClick(element));
        });
        document.querySelectorAll('[id^="read_more_project_"]').forEach((element) => {
          element.addEventListener('click', () => handleItemClick(element));
        });
      });
    });
  } catch (error) {
    console.log('Error al obtener los datos de la API:', error);
  }

}


function handleItemClick(element) {
  if (getAccount().isConnected) {
    console.log(element.id);
    const el = document.getElementById(element.id);
    const id = el.id.match(/\d+/)[0];
    console.log(id);
    window.location.href = `blog-detail.html?project_id=` + id;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'In order to consult the information of the project, you must first connect your wallet!'
    });
  }
}

fetchDataAndRender();