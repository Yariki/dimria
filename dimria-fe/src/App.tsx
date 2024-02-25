import React, {useEffect} from 'react';
import Loading from './Components/Loading';
import {useDispatch, useSelector} from "react-redux";
import {fetchAdvertsStart} from "./redux/adverts/advertSlices";
import {selectAdverts, selectAdvertLoading} from "./redux/adverts/selectors";

import {AdvertsPage} from "./Components/AdvertsPage";

function App() {

    const dispatch = useDispatch();
    const adverts = useSelector(selectAdverts);
    const loading = useSelector(selectAdvertLoading);

    useEffect(() => {
        dispatch(fetchAdvertsStart());
    }, []);

  return (
    <>
        {loading && <Loading />}
        {adverts && <AdvertsPage />}
    </>
  );
}

export default App;
