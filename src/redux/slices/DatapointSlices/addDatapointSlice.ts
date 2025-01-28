import customAxios from '@/services/customAxios';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

export type AddDatapointType = [
  {
    BranchId: number;
    name: string;
  },
];

interface DatapointState {
  data: AddDatapointType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DatapointState = {
  data: null,
  isLoading: false,
  error: null,
};

export const addDatapoint = createAsyncThunk(
  'datapoint/addDatapoint',
  async (addDatapointPayload: AddDatapointType) => {
    try {
      const response = await customAxios.post(
        'datapoint/add',
        addDatapointPayload,
      );
      return response.data;
    } catch (error) {
      return console.log('Datapoint Eklenemedi.', error);
    }
  },
);

const addDatapointSlice = createSlice({
  name: 'addDatapoint',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addDatapoint.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addDatapoint.fulfilled,
        (state, action: PayloadAction<DatapointState>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(addDatapoint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default addDatapointSlice;
