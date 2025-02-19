import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Modal } from "../interfaces/modal";

interface ModalState {
    modal: Modal
    status: 'loading' | 'succeeded' | 'failed' | null;
    error: string | null;
}

const modal: Modal = {
    state: false,
    access: null
}

const initialState: ModalState = {
    modal,
    status: null,
    error: null,
};

export const handleModalState = createAsyncThunk<Modal, Modal>(
    'user/handleModalState',
    async (modal, { rejectWithValue }) => {
        try {

            return modal;

        } catch {
            return rejectWithValue("Не удалось обработать модальное окно!");
        }
    }
);

const modalSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //get

            .addCase(handleModalState.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(handleModalState.fulfilled, (state, action: PayloadAction<Modal>) => {
                state.status = 'succeeded';
                state.modal = action.payload;
            })
            .addCase(handleModalState.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })
    },
});

export const selectModalState = (state: { modal: ModalState }) => state;
export const selectModalStateStatus = (state: { modal: ModalState }) => state.modal.status;
export const selectModalStateError = (state: { modal: ModalState }) => state.modal.error;

export default modalSlice.reducer;