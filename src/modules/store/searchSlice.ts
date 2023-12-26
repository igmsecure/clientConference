
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    searchQuery: string;
}

const initialState: SearchState = {
    searchQuery: '',
};

const searchSlice = createSlice({
    name: 'searchAuthors',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        resetSearch(state) {
            state.searchQuery = '';
        },
    },
});

export const { setSearchQuery, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;