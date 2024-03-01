import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {AdvertDto} from "../../models/AdvertDto";
import {AdvertDetailsDto} from "../../models/AdvertDetailsDto";
import {Action} from "../../models/types";


export interface AdvertsState {
    data: AdvertDto[] | null;
    loading: boolean;
    error: string | null;
    details: AdvertDetailsDto | null;
    detailsLoading: boolean;
    detailsError: string | null;
}

const initState : AdvertsState = {
    data: null,
    loading: false,
    error: '',
    details: null,
    detailsLoading: false,
    detailsError: ''
}

export const advertSlice = createSlice({
    name: 'advert',
    initialState: () => initState,
    reducers : {
        fetchAdvertsStart: (state: AdvertsState) => {
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
        }
    }
});

export const {
        fetchAdvertsStart,
        fetchAdvertsSuccess,
        fetchAdvertsFailure,
        fetchAdvertDetailsStart,
        fetchAdvertDetailsSuccess,
        fetchAdvertDetailsFailure
    } = advertSlice.actions;

export default  advertSlice.reducer;
