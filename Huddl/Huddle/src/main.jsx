import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import authReducer from "./state"
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import{
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
const persistConfig = {key:"root",storage,version:1};
const persistReduce = persistReducer(persistConfig,authReducer);
const store = configureStore({
  reducer: persistReduce,
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PERSIST, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    })
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
