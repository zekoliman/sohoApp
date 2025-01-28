import customAxios from '@/services/customAxios';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

export type EditDatapointType = [
  {
    BranchId: number;
    name: string;
  },
];

interface EditDatapointState {
  data: EditDatapointType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: EditDatapointState = {
  data: null,
  isLoading: false,
  error: null,
};

export const editDatapoint = createAsyncThunk(
  'datapoint/editDatapoint',
  async (editDatapointPayload: EditDatapointType) => {
    try {
      const response = await customAxios.post(
        'datapoint/edit',
        editDatapointPayload,
      );
      return response.data;
    } catch (error) {
      return console.log('Datapoint Düzenlenemedi.', error);
    }
  },
);

const editDatapointSlice = createSlice({
  name: 'editDatapoint',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editDatapoint.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        editDatapoint.fulfilled,
        (state, action: PayloadAction<EditDatapointState>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(editDatapoint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default editDatapointSlice;
