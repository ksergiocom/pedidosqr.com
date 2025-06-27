import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});


const userId = window.userId;

if(userId){
    console.log('Listening!')
    window.Echo.private(`user.${userId}`)
    // .listenToAll((eventName, payload) => {
    //     console.log('Evento recibido:', eventName, payload);
    // });
        .listen('.PedidoCreated', pedido => {
            console.log({pedido})
        })
    
}else{
    console.log('No userId!')
}
