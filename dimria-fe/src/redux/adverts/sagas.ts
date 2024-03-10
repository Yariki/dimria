import  {call, put, takeLatest} from 'redux-saga/effects';
import {
    fetchAdvertsStart,
    fetchAdvertsSuccess,
    fetchAdvertsFailure,
    fetchAdvertDetailsStart,
    fetchAdvertDetailsSuccess,
    fetchAdvertDetailsFailure
} from './advertSlices';
import {fetchAdverts, fetchAdvertDetails, delay} from "./requests";
import {Action} from "../../models/types";

function* fetchAdvertsAsync(action: ReturnType<typeof fetchAdvertsStart> )  {
    try {
        // @ts-ignore
        const response = yield call(fetchAdverts);
        yield put(fetchAdvertsSuccess(response.data));
    } catch (error) {
        yield put(fetchAdvertsFailure("Error fetching data"));
    }
}

function* fetchAdvertDetailsAsync(action: Action<string> )  {
    try {

        const advertId = action.payload;

        // @ts-ignore
        const response = yield call(fetchAdvertDetails, advertId);

        //yield call(delay, 500);

        // const response : AdvertDetailsDto = {
        //     "advert_id": 27272590,
        //     "city_name": "Житомир",
        //     "description": "3-к кв в новобудові, всі окремі кімнати, велика кухня, свіжий ремонт, , 2 санвузли, є право власності, є відео, запрошуємо на показ",
        //     "price": 84000,
        //     "currency": "$",
        //     "floor": "3 поверх з 10",
        //     "rooms_count": 3
        // };
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

export function* advertsSaga() {
    yield takeLatest(fetchAdvertsStart.type, fetchAdvertsAsync);
    yield takeLatest(fetchAdvertDetailsStart.type, fetchAdvertDetailsAsync);
}
