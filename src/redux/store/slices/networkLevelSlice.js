import { createSlice } from '@reduxjs/toolkit';

const networkLevelSlice = createSlice({
    name: 'networkLevel',
    initialState: {
        levels: []
    },
    reducers: {
        goNextLevel: (state, action) => {
            if (!state.levels.includes(action.payload)) {
                state.levels.push(action.payload);
            }
        },
        goBackLevel: (state) => {
            state.levels.pop();
        },
        clearLevel: (state) => {
            state.levels = [];
        }
    }
});

export const { goNextLevel, goBackLevel, clearLevel } = networkLevelSlice.actions;
export default networkLevelSlice.reducer;
