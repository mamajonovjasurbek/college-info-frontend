import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    showModal: boolean;
}

const initialState: CounterState = {
    showModal: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        showModal: (state) => {
            state.showModal = true;
        },
        closeModal: (state) => {
            state.showModal = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { showModal, closeModal } = userSlice.actions;

export default userSlice.reducer;
