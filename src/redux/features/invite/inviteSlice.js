// inviteSlice.js
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; // Import the library for handling cookies
import { baseUrl } from '../../../../config';
import { toast } from 'react-toastify';
import socketService from '../../../hooks/socketService';
import {updateUserTeams} from "../user/userSlice"

// Define a function to get the user token from cookies
// Define an async thunk for making API requests with the token
const makeApiRequestWithToken = async (url, method, body) => {
    try {
        const token = Cookies.get("accessToken");
        const response = await fetch(url, {
            method,
            headers: {
                authorization: `${token}`,
                'Content-Type': 'application/json', // Adjust the content type as needed
            },
            body: JSON.stringify(body),
        });
        // Handle response as needed
        toast(response?.message)
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle errors as needed
        toast.error(error?.message);
        throw error;
    }
};

// Define an async thunk for sending invitations
export const sendInvitation = createAsyncThunk(
    'invitations/sendInvitation',
    async ({ data, teamName }) => {
        const { email, teamRole } = data;
        const url = `${baseUrl}/user/send-invitation/${teamName}`;
        const method = 'PATCH';
        const body = { email, teamRole };
        return makeApiRequestWithToken(url, method, body);
    }
);
// Define an async thunk for accepting invitations
// export const acceptInvitation = createAsyncThunk(
//     'invitations/acceptInvitation',
//     async ({ userId, teamName }) => {
//         const url = `${baseUrl}/user/${userId}/accept-invitation/${teamName}`;
//         const method = 'PATCH';
//         const body = {}; // Adjust the request body as needed
//         return makeApiRequestWithToken(url, method, body);
//     }
// );

export const acceptInvitation = createAsyncThunk(
    'invitations/acceptInvitation',
    async ({ userId, teamName }, { dispatch }) => { // Pass dispatch as a parameter
        const url = `${baseUrl}/user/${userId}/accept-invitation/${teamName}`;
        const method = 'PATCH';
        const body = {}; // Adjust the request body as needed

        try {
            const response = await makeApiRequestWithToken(url, method, body);

            dispatch(updateUserTeams(response.updatedTeams));
            // Emit a Socket.IO event to notify other clients
            socketService.emitAcceptInvitation({ userId, teamName });

            return response;
        } catch (error) {
            throw error;
        }
    }
);



// Define an async thunk for rejecting invitations
export const rejectInvitation = createAsyncThunk(
    'invitations/rejectInvitation',
    async ({ userId, teamName }) => {
        const url = `${baseUrl}/user/${userId}/reject-invitation/${teamName}`;
        const method = 'PATCH';
        const body = {}; // Adjust the request body as needed
        return makeApiRequestWithToken(url, method, body);
    }
);

// Create the inviteSlice
const inviteSlice = createSlice({
    name: 'invitations',
    initialState: {
        latestInvite: null,
        formInviteData: {
            email: '',
            teamRole: '',
        },
        currentInviteStep: 1,
    },
    reducers: {
        setLatestInvite: (state, action) => {
            state.latestInvite = action.payload;
        },
        incrementInviteStep: (state) => {
            // Increment the current step
            state.currentInviteStep += 1;
        },
    },
    extraReducers: (builder) => {
        // Handle the results of the async thunks
        builder.addCase(sendInvitation.fulfilled, (state, action) => {
            state.latestInvite = action.payload;
        });

        builder.addCase(acceptInvitation.fulfilled, (state, action) => {
            state.latestInvite = null;
        });

        builder.addCase(rejectInvitation.fulfilled, (state, action) => {
            state.latestInvite = null;
        });
    },
});

export const updateInviteFormData = createAction('user/updateInviteFormData');
export const selectCurrentInviteStep = (state) => state.invitations.currentInviteStep;
export const { setLatestInvite, incrementInviteStep } = inviteSlice.actions;
export default inviteSlice.reducer;
