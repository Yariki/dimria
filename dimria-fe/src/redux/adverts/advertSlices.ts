import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {AdvertDto} from "../../models/AdvertDto";

export interface AdvertsState {
    data: AdvertDto[] | null;
    loading: boolean;
    error: string | null;
}

const initState : AdvertsState = {
    data: null,
    loading: false,
    error: ''
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
        }
    }
});

export const { fetchAdvertsStart, fetchAdvertsSuccess, fetchAdvertsFailure } = advertSlice.actions;

export default  advertSlice.reducer;
