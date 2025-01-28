import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GlobalLoadType {
  isLoading: boolean;
}

const initialState: GlobalLoadType = {
  isLoading: false,
};

const globalLoadSlice = createSlice({
  name: 'globalLoad',
  initialState,
  reducers: {
    setGlobalLoadState: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
});

export const {setGlobalLoadState} = globalLoadSlice.actions;
export default globalLoadSlice;
