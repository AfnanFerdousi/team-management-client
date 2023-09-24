// store.js
import { configureStore } from '@reduxjs/toolkit';
import {api} from './api/apiSlice';
import inviteSlice from './features/invite/inviteSlice';
import teamSlice from './features/team/teamSlice';

const store = configureStore({
    reducer: {
        teams: teamSlice,
        invitations: inviteSlice,
        [api.reducerPath]: api.reducer,
    },
    // ... other configurations
});

export default store;
