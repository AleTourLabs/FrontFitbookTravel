
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

// Obtén una referencia al formulario
const form = document.getElementById('create_comment');

// Agrega un controlador de eventos para el evento de envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Obtén los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comments = document.getElementById('comments').value;

    if (!name) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must add the user name!'
        });
        return;
    }
    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must add the user email!'
        });
        return;
    }
    if (!comments) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must add the comment!'
        });
        return;
    }

    if (getAccount().isConnected) {
        console.log(getAccount());
        // Check if the address is already registered
        fetch(`https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/${getAccount().address}/address`)
            .then(response => response.json())
            .then(async data => {
                console.log(data.data.length);
                if (data.data.length !== 0) {
                    // Address already registered, do not send the request again
                    console.log('Address already registered:', getAccount().address);
                    const userId = data.data[0].user_id;
                    if (!data.data[0].name) {

                        const userUpdate = {
                            name: name,
                            email: email
                        }

                        await fetch('https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/' + userId, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Origin': 'https://fitbooktravel2.tourfeelinglabs.com/dist/',
                                'Access-Control-Request-Method': 'PUT'
                            },
                            body: JSON.stringify(userUpdate)
                        })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Usuario actualizado con éxito');
                                } else {
                                    console.error('Error al actualizar el usuario');
                                }
                            })
                            .catch(error => {
                                // Hubo un error en la solicitud AJAX
                                console.error('Error en la solicitud AJAX', error);
                                // Aquí puedes agregar tu lógica adicional, como mostrar un mensaje de error al usuario
                            });
                    }

                    // Crea un objeto con los datos del comentario en formato JSON
                    const commentData = {
                        text: comments,
                        user_id: userId
                    };

                    // Realiza la solicitud AJAX utilizando la biblioteca Fetch API
                    await fetch('https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/' + project_id + '/comments', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': 'https://fitbooktravel2.tourfeelinglabs.com/dist/',
                            'Access-Control-Request-Method': 'POST'
                        },
                        body: JSON.stringify(commentData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === "OK") {
                                // El comentario se envió correctamente
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Comment sent successfully'
                                });
                                document.getElementById('name').value = "";
                                document.getElementById('email').value = "";
                                document.getElementById('comments').value = "";
                                reloadComments(data.data.insertId);
                                // Aquí puedes agregar tu lógica adicional, como mostrar un mensaje de éxito al usuario
                            } else {
                                // Hubo un error al enviar el comentario
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Error sending comment!'
                                });
                                console.error('Error al enviar el comentario');
                                // Aquí puedes agregar tu lógica adicional, como mostrar un mensaje de error al usuario
                            }
                        })
                        .catch(error => {
                            // Hubo un error en la solicitud AJAX
                            console.error('Error en la solicitud AJAX', error);
                            // Aquí puedes agregar tu lógica adicional, como mostrar un mensaje de error al usuario
                        });
                    return;
                }
            })
    }
});

async function reloadComments(insertId) {
    try {
        await fetch(`https://fitbooktravel-api.tourfeelinglabs.com/api/v1/projects/${insertId}/comment`)
            .then(response => response.json())
            .then(async data => {
                const comment_section = document.getElementById('comments_section');

                const userComment = `https://fitbooktravel-api.tourfeelinglabs.com/api/v1/users/${data.data[0].user_id}`;
                const responseUserComment = await fetch(userComment);
                const resultUserComment = await responseUserComment.json();

                const dateComment = new Date(data.data[0].created_at);
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
                    <p class="text-slate-400 italic">" ${data.data[0].text} "
                    </p>
                </div>
            </div>        
            `;
                comment_section.insertAdjacentHTML('afterbegin', paragraph);
                const title_comment = '<h5 class="text-lg font-semibold">Comments:</h5>';
                comment_section.insertAdjacentHTML('afterbegin', title_comment);
            });
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }
}