import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { createLogger } from "redux-logger";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import session from "redux-persist/lib/storage/session";
import UserSlice from "../reducers/users/UserSlice";

const persistConfig: any = {
    key: "root",
    storage: session,
    stateReconciler: autoMergeLevel2,
    blacklist: [],
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
