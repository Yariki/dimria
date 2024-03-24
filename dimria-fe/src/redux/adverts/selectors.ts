import {State} from "../types";


export const selectAdverts = (state: State) => state.advert.data;
export const selectAdvertLoading = (state: State) => state.advert.loading;
export const selectAdvertError = (state: State) => state.advert.error;
export const selectDetails = (state: State) => state.advert.details;
export const selectDetailsLoading = (state: State) => state.advert.detailsLoading;
export const selectDetailsError = (state: State) => state.advert.detailsError;
export const selectCities = (state: State) => state.advert.cities;
export const selectCitiesLoading = (state: State) => state.advert.loadingCities;
export const selectCitiesError = (state: State) => state.advert.citiesError;



