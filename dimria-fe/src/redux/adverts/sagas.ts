import  {call, put, takeLatest} from 'redux-saga/effects';
import {
    fetchAdvertsStart,
    fetchAdvertsSuccess,
    fetchAdvertsFailure,
    fetchAdvertDetailsStart,
    fetchAdvertDetailsSuccess,
    fetchAdvertDetailsFailure,
    fetchCitiesStart,
    fetchCitiesSuccess,
    fetchCitiesFailure
} from './advertSlices';
import {fetchAdverts, fetchAdvertDetails, fetchCities} from "./requests";
import {Action} from "../../models/types";

function* fetchAdvertsAsync(action: ReturnType<typeof fetchAdvertsStart> )  {
    try {

        const cityId =  action.payload;

        // @ts-ignore
        const response = yield call(fetchAdverts, cityId);
        yield put(fetchAdvertsSuccess(response.data));
    } catch (error) {
        yield put(fetchAdvertsFailure("Error fetching data"));
        console.log(error);
    }
}

function* fetchAdvertDetailsAsync(action: Action<string> )  {
    try {

        const advertId = action.payload;

        // @ts-ignore
        const response = yield call(fetchAdvertDetails, advertId);
        if(response.status === 200){
            yield put(fetchAdvertDetailsSuccess(response.data));
        }
        else{
            throw new Error("Error fetching data details");
        }

    }catch (error){
        yield put(fetchAdvertDetailsFailure("Error fetching data details"));
        console.log(error);
    }
}

function* fetchCitiesAsync() {
    try {
        // @ts-ignore
        const response = yield call(fetchCities);
        yield put(fetchCitiesSuccess(response.data));
    } catch (error) {
        yield put(fetchCitiesFailure("Error fetching cities"));
        console.log(error);
    }
}

export function* advertsSaga() {
    yield takeLatest(fetchAdvertsStart.type, fetchAdvertsAsync);
    yield takeLatest(fetchAdvertDetailsStart.type, fetchAdvertDetailsAsync);
    yield takeLatest(fetchCitiesStart.type, fetchCitiesAsync);
}
