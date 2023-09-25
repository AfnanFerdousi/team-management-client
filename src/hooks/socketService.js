// socketService.js

import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

const socket = io('https://tm-server-seven.vercel.app'); // Replace with your server URL

let invitationSentListenerAdded = false;
let invitationAcceptedListenerAdded = false; // Add a new flag for the accepted event
const email = Cookies.get("email");

// Define event handlers or functions for sending messages
const socketService = {
    onInvitationSent: (callback) => {
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

    // Add a function to emit invitationAccepted event
    emitAcceptInvitation: ({ userId, teamName }) => {
        // Emit the invitationAccepted event with the relevant data
        socket.emit('invitationAccepted', { userId, teamName });
    },

    // Add a function to listen for invitationAccepted event
    onInvitationAccepted: (callback) => {
        socket.on('invitationAccepted', (data) => {
            if (data.email && data.email === email) {
                if (callback && typeof callback === 'function') {
                    callback(data);
                }
            }
        });
        invitationAcceptedListenerAdded = true;
    },

    // Add a function to remove the invitationAccepted listener
    removeInvitationAcceptedListener: (callback) => {
        if (callback && typeof callback === 'function') {
            socket.off('invitationAccepted', callback);
        }
        invitationAcceptedListenerAdded = false;
    },
};

export default socketService;
