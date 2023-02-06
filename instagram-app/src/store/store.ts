// redux/store/index.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { testSlice, postSlice, modalSlice, userSlice } from "../store/slice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

export type reducerState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    test: testSlice.reducer,
    modal: modalSlice.reducer,
    user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<reducerState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
