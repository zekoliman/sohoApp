import customAxios from '@/services/customAxios';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

export interface Branch {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  openning_time: string;
  closing_time: string;
  city: number;
  country: number;
  type_id: number;
  time_zone: string;
}

interface BranchState {
  data: Branch | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getBranch = createAsyncThunk('branch/getBranch', async () => {
  try {
    const response = await customAxios.get('branch/get');
    return response.data;
  } catch (error) {
    return console.log('Branch bilgisi alınamadı.', error);
  }
});

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBranch.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBranch.fulfilled, (state, action: PayloadAction<Branch>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default branchSlice;
