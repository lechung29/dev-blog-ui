import { useReducer } from "react";

export const useCustomReducer = <T>(initialState: T) => {
    return useReducer<React.Reducer<T, Partial<T>>>((prevState, payload) => ({
        ...prevState,
        ...payload,
    }), initialState);
}