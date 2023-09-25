import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../../../../config';

// Define the initial state
const initialState = {
    users: [],
    teams: [],
    loading: false,
    error: null,
};

// Create an async action for getting users
// userSlice.js
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const token = Cookies.get('accessToken'); // Get the token from cookies

    try {
        const response = await axios.get(`${baseUrl}/user`, {
            headers: {
                authorization: `${token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        throw error; 
    }
});

// Create a userSlice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserTeams: (state, action) => {
            state.teams = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Update the users array with the fetched data
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const { updateUserTeams } = userSlice.actions;
export default userSlice.reducer;