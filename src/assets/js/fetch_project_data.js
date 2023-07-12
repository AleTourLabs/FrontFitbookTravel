import { WagmiCore } from 'https://unpkg.com/@web3modal/ethereum';

const { getAccount } = WagmiCore;

// Obtén los parámetros de la cadena de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);

// Lee el valor del parámetro 'project_id'
const project_id = urlParams.get('project_id');

// Utiliza el valor del project_id como desees
console.log(project_id);

const apiUrl = 'https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/' + project_id;



function fetchDataAndRender() {
    try {
        document.addEventListener("DOMContentLoaded", async function (event) {
            const response = await fetch(apiUrl);
            const result = await response.json();
            const data = result.data;

            const title = document.getElementById('title_project');
            title.innerHTML = data[0].title;

            const date = new Date(data[0].created_at);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            const date_init = document.getElementById('date_init_project');
            date_init.innerHTML = formattedDate;

            const description = document.getElementById('description_project');
            description.innerHTML = data[0].description;

            const user = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/${data[0].user_id}`;
            const resUser = await fetch(user);
            const resultUser = await resUser.json();

            const creator = document.getElementById('creator_project');
            creator.innerHTML = resultUser.data[0].name;

            const commentsUrl = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${project_id}/comments`;
            const responseComments = await fetch(commentsUrl);
            const resultComments = await responseComments.json();

            const comment_section = document.getElementById('comments_section');
            comment_section.innerHTML = '<h5 class="text-lg font-semibold">Comments:</h5>';

            await resultComments.data.reverse().slice(0, 6).forEach(async (item) => {
                const userComment = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/${item.user_id}`;
                const responseUserComment = await fetch(userComment);
                const resultUserComment = await responseUserComment.json();

                const dateComment = new Date(item.created_at);
                const optionsComment = { day: 'numeric', month: 'short', year: 'numeric' };
                const formattedDateComment = dateComment.toLocaleDateString('en-US', optionsComment);

                const timeOptionsComment = { hour: 'numeric', minute: '2-digit', hour12: true };
                const formattedTimeComment = dateComment.toLocaleTimeString('en-US', timeOptionsComment);

                const formattedDateTimeComment = `${formattedDateComment} at ${formattedTimeComment}`;

                const paragraph = `
            <div class="mt-8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img src="assets/images/client/01.jpg" class="h-11 w-11 rounded-full shadow" alt="">

                        <div class="ms-3 flex-1">
                            <a href=""
                                class="text-lg font-semibold hover:text-indigo-600 transition-all duration-500 ease-in-out">${resultUserComment.data[0].name} <span class="text-sm text-slate-400">0x74832743274847374389</span></a>
                            <p class="text-sm text-slate-400">${formattedDateTimeComment}</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                    <p class="text-slate-400 italic">" ${item.text} "
                    </p>
                </div>
            </div>        
            `;

                comment_section.innerHTML += paragraph;
            });

            const votesUrl = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${project_id}/votes`;
            const responseVotes = await fetch(votesUrl);
            const resultVotes = await responseVotes.json();

            const numVotesUrl = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${project_id}/num_votes`;
            const responseNumVotes = await fetch(numVotesUrl);
            const resultNumVotes = await responseNumVotes.json();

            const vote_section = document.getElementById('votes_projects');
            vote_section.innerHTML = `
    <div
        class="group flex h-[57px] justify-between rounded-t-none border-b border-skin-border px-4 pb-[12px] pt-3 md:rounded-t-lg">
        <h4 class="flex items-center">
            <div class="font-semibold hover:text-indigo-600">Votes <span class="text-sm text-slate-400 px-2"> ${resultNumVotes.data[0].votes}</span></div>
        </h4>
        <div class="flex items-center">

        </div>
    </div>`;
            await resultVotes.data.reverse().slice(0, 6).forEach(async (item) => {
                const userVote = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/${item.user_id}`;
                const responseUserVote = await fetch(userVote);
                const resultUserVote = await responseUserVote.json();

                const paragraph = `
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
        </div>   
            `;

                vote_section.innerHTML += paragraph;
            });

            const recentProjectURL = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/?project_publish=1`;
            const responseRecentProject = await fetch(recentProjectURL);
            const resultRecentProject = await responseRecentProject.json();

            const recent_project = document.getElementById('recent_projects');

            await resultRecentProject.data.reverse().slice(0, 3).forEach(async (item) => {
                const dateProject = new Date(item.created_at);
                const optionsProject = { day: 'numeric', month: 'short', year: 'numeric' };
                const formattedDateProject = dateProject.toLocaleDateString('en-US', optionsProject);

                const paragraphProject = `
                <div class="flex items-center mt-8">
                <img src="assets/images/blog/06.jpg" class="h-16 rounded-md shadow dark:shadow-gray-800"
                    alt="">

                <div class="ms-3">
                    <a href="blog-detail.html?project_id=${item.project_id}" class="font-semibold hover:text-indigo-600">${item.title}</a>
                    <p class="text-sm text-slate-400">${formattedDateProject}</p>
                </div>
            </div>   
            `;

                recent_project.innerHTML += paragraphProject;
            });
        });
    } catch (error) {
        console.log('Error al obtener los datos de la API:', error);
    }
}

fetchDataAndRender();
