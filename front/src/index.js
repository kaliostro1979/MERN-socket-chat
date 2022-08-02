import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss'
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./redux/store"

const persistedStore = persistStore(store)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
        <App/>
    </PersistGate>
</Provider>);
