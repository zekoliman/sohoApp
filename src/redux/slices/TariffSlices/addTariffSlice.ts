import customAxios from '@/services/customAxios';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Branch} from '../getBranchSlice';

export interface TariffTypes {
  status: string;
}

interface TariffTypeState {
  data: TariffTypes | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TariffTypeState = {
  data: null,
  isLoading: false,
  error: null,
};

export const addTariff = createAsyncThunk(
  'tariff/addTariff',
  async ({addTariffPayload}: TariffTypes) => {
    try {
      const response = await customAxios.post('branch/add', addTariffPayload);
      return response.data;
    } catch (error) {
      return console.log('Tarife Eklenemedi.', error);
    }
  },
);

const addTariffSlice = createSlice({
  name: 'addTariff',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addTariff.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addTariff.fulfilled,
        (state, action: PayloadAction<TariffTypeState>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(addTariff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default addTariffSlice;
