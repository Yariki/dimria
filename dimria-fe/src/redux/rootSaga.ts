import {all} from 'redux-saga/effects';

import {advertsSaga} from './adverts/sagas';

export default function* rootSaga() {
    yield all([advertsSaga()]);
}
