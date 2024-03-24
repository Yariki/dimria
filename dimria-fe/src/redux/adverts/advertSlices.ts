import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {AdvertDto} from "../../models/AdvertDto";
import {AdvertDetailsDto} from "../../models/AdvertDetailsDto";
import {Action} from "../../models/types";
import { CityDto } from "../../models/CityDto";
import { fetchCities } from "./requests";


export interface AdvertsState {
    data: AdvertDto[] | null;
    loading: boolean;
    error: string | null;
    details: AdvertDetailsDto | null;
    detailsLoading: boolean;
    detailsError: string | null;
    cities: CityDto[] | null;
    loadingCities: boolean;
    citiesError: string | null;
}

const initState : AdvertsState = {
    data: null,
    loading: false,
    error: '',
    details: null,
    detailsLoading: false,
    detailsError: '',
    cities: null,
    loadingCities: false,
    citiesError: ''
}

export const advertSlice = createSlice({
    name: 'advert',
    initialState: () => initState,
    reducers : {
        fetchAdvertsStart: (state: AdvertsState, action: Action<number>) => {
            state.loading = true;
            state.error = '';
        },
        fetchAdvertsSuccess: (state: AdvertsState, action: Action<any>) => {
            state.data = action.payload as AdvertDto[]
            state.loading = false;
            state.error = '';
        },
        fetchAdvertsFailure: (state: AdvertsState, action: Action<string>) => {
            state.data = null;
            state.loading = false;
            state.error = action.payload;
        },
        fetchAdvertDetailsStart: (state: AdvertsState, action: Action<string>) => {
            state.detailsLoading = true;
            state.detailsError = '';
        },
        fetchAdvertDetailsSuccess: (state: AdvertsState, action: Action<any>) => {
            state.details = action.payload;
            state.detailsLoading = false;
            state.detailsError = '';
        },
        fetchAdvertDetailsFailure: (state: AdvertsState, action: Action<string>) => {
            state.details = null;
            state.detailsLoading = false;
            state.detailsError = action.payload;
        },
        fetchCitiesStart: (state: AdvertsState) => {
            state.loadingCities = true;
        },
        fetchCitiesSuccess: (state: AdvertsState, action: Action<any>) => {
            state.cities = action.payload as CityDto[];
            state.loadingCities = false;
        },
        fetchCitiesFailure: (state: AdvertsState, action: Action<string>) => {
            state.cities = null;
            state.loadingCities = false;
            state.citiesError = action.payload;
        }
    }
});

export const {
        fetchAdvertsStart,
        fetchAdvertsSuccess,
        fetchAdvertsFailure,
        fetchAdvertDetailsStart,
        fetchAdvertDetailsSuccess,
        fetchAdvertDetailsFailure,
        fetchCitiesStart,
        fetchCitiesSuccess,
        fetchCitiesFailure
    } = advertSlice.actions;

export default  advertSlice.reducer;
