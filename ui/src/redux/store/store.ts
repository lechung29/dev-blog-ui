import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { createLogger } from "redux-logger";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import UserSlice from "../reducers/users/UserSlice";
import storage from "redux-persist/lib/storage";

const persistConfig: any = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: [],
};

const rootReducer = combineReducers({
    user: UserSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
