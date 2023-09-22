// socketService.js

import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

let invitationSentListenerAdded = false;

// Define event handlers or functions for sending messages
const socketService = {
    onInvitationSent: (callback) => {
        socket.on('invitationSent', (data) => {
            console.log(data);
            if (callback && typeof callback === 'function') {
                callback(data);
            }
        });
        invitationSentListenerAdded = true;
    },

    removeInvitationSentListener: (callback) => {
        if (callback && typeof callback === 'function') {
            socket.off('invitationSent', callback);
        }
        invitationSentListenerAdded = false;
    },

    isInvitationSentListenerAdded: () => {
        return invitationSentListenerAdded;
    },

    sendChatMessage: (message) => {
        socket.emit('chatMessage', message);
    },
};

export default socketService;
