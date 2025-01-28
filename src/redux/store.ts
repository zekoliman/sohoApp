import {configureStore} from '@reduxjs/toolkit';
import globalLoadSlice from './slices/globalLoadSlice';
import getBranchSlice from './slices/getBranchSlice';
import getDatapointSlice from './slices/DatapointSlices/getDatapointSlice';
import addDatapointSlice from './slices/DatapointSlices/addDatapointSlice';
import getDeviceSlice from './slices/DeviceSlices/getDeviceSlice';

export const store = configureStore({
  reducer: {
    globalLoad: globalLoadSlice.reducer,
    getBranch: getBranchSlice.reducer,
    getDatapoint: getDatapointSlice.reducer,
    addDatapoint: addDatapointSlice.reducer,
    getDevice: getDeviceSlice.reducer,
  },
});

export default store;

export const {dispatch: storeDispatch} = store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
