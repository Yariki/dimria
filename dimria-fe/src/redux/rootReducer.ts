import {combineReducers} from "redux";
import advertReducer from "./adverts/advertSlices";

export const rootReducer = combineReducers({
    advert: advertReducer
});
