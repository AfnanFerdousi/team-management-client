import { configureStore } from '@reduxjs/toolkit';
import { api } from '../redux/api/apiSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;

export default store;
