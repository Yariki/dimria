import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Adverts from "../../models/Adverts";

export interface AdvertsState {
    data: Adverts[] | null;
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
            const data : Adverts[] = [];
            for (let key in action.payload) {
                const keyData = Number(key);
                data.push({
                    advert_id: keyData,
                    adverts: action.payload[keyData]
                });
            }
            state.data = data;
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
