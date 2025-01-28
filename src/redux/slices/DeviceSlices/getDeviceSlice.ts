import customAxios from '@/services/customAxios';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

interface DeviceState {
  data: Device | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getDevice = createAsyncThunk('device/getDevice', async () => {
  try {
    const response = await customAxios.get('modem/list?modemstatus=true');
    return response.data;
  } catch (error) {
    console.log('Cihaz bilgisi alınamadı.', error);
  }
});

const getDeviceSlice = createSlice({
  name: 'getDevice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDevice.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDevice.fulfilled, (state, action: PayloadAction<Device>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default getDeviceSlice;
