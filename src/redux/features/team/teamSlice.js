import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../../../../config';

// Create an async action for getting teams
export const fetchTeams = createAsyncThunk('/team', async () => {
    const token = Cookies.get('accessToken'); // Get the token from cookies
    console.log(token);
    try {
        const response = await axios.get(`${baseUrl}/team`, {
            headers: {
                authorization: `${token}`, // Include the token in the headers
            },
        });
        return response; // Return the entire response object
    } catch (error) {
        throw error; // Throw the error so it can be caught by the rejected action
    }
});


// Create an async action for creating a new team
export const createNewTeam = createAsyncThunk(
    'team/createNewTeam',
    async (teamData) => {
        const token = Cookies.get('accessToken'); // Get the token from cookies
        const response = await fetch(`${baseUrl}/team/create-team`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `${token}`, // Include the token in the headers
            },
            body: JSON.stringify(teamData),
        });
        const data = await response.json();
        return data;
    }
);


const teamSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: null, // Initial state for teams
        status: 'idle', // Async request status
        error: null, // Error message
    },
    reducers: {
        // Other reducer actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.teams = action.payload;
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createNewTeam.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.teams.push(action.payload);
            })
            .addCase(createNewTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { /* other actions if needed */ } = teamSlice.actions;
export const selectTeams = (state) => state.teams?.teams;
export const selectStatus = (state) => state.teams?.status;
export const selectError = (state) => state.teams?.error;
export default teamSlice.reducer;
