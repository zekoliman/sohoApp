import customAxios from '@/services/customAxios';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

export interface Datapoint {
  id: string;
  name: string;
  branchId: number;
  branchName: string;
}

interface DatapointState {
  data: Datapoint | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DatapointState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getDatapoint = createAsyncThunk(
  'datapoint/getDatapoint',
  async () => {
    try {
      const response = await customAxios.get('datapoint/list');
      return response.data.data;
    } catch (error) {
      return console.log('Datapoint bilgisi alınamadı.', error);
    }
  },
);

const datapointSlice = createSlice({
  name: 'datapoint',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDatapoint.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getDatapoint.fulfilled,
        (state, action: PayloadAction<Datapoint>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(getDatapoint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default datapointSlice;
