import  {call, put, takeLatest} from 'redux-saga/effects';
import {fetchAdvertsStart, fetchAdvertsSuccess, fetchAdvertsFailure} from './advertSlices';
import {fetchAdverts} from "./requests";

function* fetchAdvertsAsync(action: ReturnType<typeof fetchAdvertsStart> )  {
    try {
        // @ts-ignore
        const response = yield call(fetchAdverts);
        yield put(fetchAdvertsSuccess(response.data));
    } catch (error) {
        yield put(fetchAdvertsFailure("Error fetching data"));
    }
}

export function* advertsSaga() {
    yield takeLatest(fetchAdvertsStart.type, fetchAdvertsAsync);
}
