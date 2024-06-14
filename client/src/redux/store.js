import { configureStore } from '@reduxjs/toolkit';
import reducer from './root-reducer';
import logger from 'redux-logger'

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });

  export default store;