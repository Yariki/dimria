import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './rootReducer';
import rootSaga from './rootSaga';

const  createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
    });
    sagaMiddleware.run(rootSaga);
    return store;
};

export default createStore;