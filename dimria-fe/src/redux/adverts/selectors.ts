import {State} from "../types";


export const selectAdverts = (state: State) => state.advert.data;
export const selectAdvertLoading = (state: State) => state.advert.loading;
export const selectAdvertError = (state: State) => state.advert.error;


