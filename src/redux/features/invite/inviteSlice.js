// inviteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; // Import the library for handling cookies
import { baseUrl } from '../../../../config';
import { toast } from 'react-toastify';

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
        toast.success("Successful")
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle errors as needed
        throw error;
    }
};

// Define an async thunk for sending invitations
export const sendInvitation = createAsyncThunk(
    'invitations/sendInvitation',
    async (teamName) => {
        const url = `${baseUrl}/user/send-invitation/${teamName}`;
        const method = 'PATCH';
        const body = {email, teamRole}; // Adjust the request body as needed
        return makeApiRequestWithToken(url, method, body);
    }
);

// Define an async thunk for accepting invitations
export const acceptInvitation = createAsyncThunk(
    'invitations/acceptInvitation',
    async ({ userId, teamName }) => {
        const url = `${baseUrl}/user/${userId}/accept-invitation/${teamName}`;
        const method = 'PATCH';
        const body = {}; // Adjust the request body as needed
        return makeApiRequestWithToken(url, method, body);
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
    },
    reducers: {
        setLatestInvite: (state, action) => {
            state.latestInvite = action.payload;
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

export const { setLatestInvite } = inviteSlice.actions;
export default inviteSlice.reducer;
