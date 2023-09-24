// socketService.js

import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

let invitationSentListenerAdded = false;
const email = Cookies.get("email");

// Define event handlers or functions for sending messages
const socketService = {
    onInvitationSent: ( callback) => {
        socket.on('invitationSent', (data) => {
            // Check if data.email is defined and matches the logged-in user's email
            if (data.email && data.email === email) {
                if (callback && typeof callback === 'function') {
                    callback(data);
                }
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
};

export default socketService;
