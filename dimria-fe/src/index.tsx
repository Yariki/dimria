import React from 'react';
import ReactDOM from 'react-dom/client';
import {Bar, Page, ThemeProvider, Title} from '@ui5/webcomponents-react'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppShell} from "./Components/AppShell/AppShell";
import createStore from "./redux/store";
import {Provider} from "react-redux";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const store = createStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <AppShell>
                    <Page header={<Bar startContent={<Title>Adverts</Title>}/>}>
                        <DevSupport ComponentPreviews={ComponentPreviews}
                                    useInitialHook={useInitial}
                        >
                            <App/>
                        </DevSupport>
                    </Page>
                </AppShell>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
