// inviteSlice.js
import { createSlice } from '@reduxjs/toolkit';

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
});

export const { setLatestInvite } = inviteSlice.actions;
export default inviteSlice.reducer;
