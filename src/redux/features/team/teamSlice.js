// teamSlice.js
import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
    name: 'teams',
    initialState: [],
    reducers: {
        setTeams: (state, action) => {
            return action.payload;
        },
        addTeam: (state, action) => {
            state.push(action.payload);
        },
        updateTeam: (state, action) => {
            // Implement logic to update a team in state
        },
        deleteTeam: (state, action) => {
            // Implement logic to delete a team from state
        },
    },
});

export const { setTeams, addTeam, updateTeam, deleteTeam } = teamSlice.actions;
export const selectTeams = (state) => state.teams;
export default teamSlice;
