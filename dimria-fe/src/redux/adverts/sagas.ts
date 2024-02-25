import  {call, put, takeLatest} from 'redux-saga/effects';
import {fetchAdvertsStart, fetchAdvertsSuccess, fetchAdvertsFailure, fetchAdvertDetailsStart, fetchAdvertDetailsSuccess, fetchAdvertDetailsFailure} from './advertSlices';
import {fetchAdverts, fetchAdvertDetails} from "./requests";

function* fetchAdvertsAsync(action: ReturnType<typeof fetchAdvertsStart> )  {
    try {
        // @ts-ignore
        const response = yield call(fetchAdverts);
        yield put(fetchAdvertsSuccess(response.data));
    } catch (error) {
        yield put(fetchAdvertsFailure("Error fetching data"));
    }
}

function* fetchAdvertDetailsAsync(action: ReturnType<typeof fetchAdvertsStart> )  {
    try {
        // @ts-ignore
        const response = yield call(fetchAdvertDetails);
        yield put(fetchAdvertDetailsSuccess(response.data));
    }catch (error){
        yield put(fetchAdvertDetailsFailure("Error fetching data details"));
    }
}

export function* advertsSaga() {
    yield takeLatest(fetchAdvertsStart.type, fetchAdvertsAsync);
    yield takeLatest(fetchAdvertDetailsStart.type, fetchAdvertDetailsAsync);
}
