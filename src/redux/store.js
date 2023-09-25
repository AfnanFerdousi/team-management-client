// store.js
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import inviteSlice from './features/invite/inviteSlice';
import teamSlice from './features/team/teamSlice';
import userSlice from './features/user/userSlice';

const store = configureStore({
    reducer: {
        users: userSlice,
        teams: teamSlice, // Provide a key ('teams') for the teamSlice reducer
        invitations: inviteSlice,
        [api.reducerPath]: api.reducer,
    },
});

export default store;
