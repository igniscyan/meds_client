import { configureStore } from '@reduxjs/toolkit';
import { demographicsReducer } from './reducers';
import { api } from './Services/api';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    demographicsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
