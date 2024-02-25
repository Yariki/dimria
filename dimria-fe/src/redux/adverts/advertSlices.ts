import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {AdvertDto} from "../../models/AdvertDto";
import {AdvertDetailsModalProps} from "../../Components/AdvertDetails";

export interface AdvertsState {
    data: AdvertDto[] | null;
    loading: boolean;
    error: string | null;
    details: AdvertDetailsModalProps | null;
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
        fetchAdvertsSuccess: (state: AdvertsState, action: PayloadAction<any>) => {
            state.data = action.payload as AdvertDto[]
            state.loading = false;
            state.error = '';
        },
        fetchAdvertsFailure: (state: AdvertsState, action: PayloadAction<string>) => {
            state.data = null;
            state.loading = false;
            state.error = action.payload;
        },
        fetchAdvertDetailsStart: (state: AdvertsState) => {
            state.detailsLoading = true;
            state.detailsError = '';
        },
        fetchAdvertDetailsSuccess: (state: AdvertsState, action: PayloadAction<any>) => {
            state.details = action.payload;
            state.detailsLoading = false;
            state.detailsError = '';
        },
        fetchAdvertDetailsFailure: (state: AdvertsState, action: PayloadAction<string>) => {
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
