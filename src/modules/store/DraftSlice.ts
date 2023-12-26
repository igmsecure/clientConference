import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArticleState {
    article: {
        id: number;
        title: string;
        annotation: string;
        description: string;
        status: string;
        review: number;
        user: number;
        moderator: number;
        creation_date: string;
        approving_date?: string;
        publication_date?: string;
    } | null;
}

const initialState: ArticleState = {
    article: null,
};

const draftSlice = createSlice({
    name: 'draftCart',
    initialState,
    reducers: {
        setArticlesDraft(state, action: PayloadAction<ArticleState['article']>) {
            state.article = action.payload;
        },
        // Добавьте другие reducers, если это необходимо
    },
});

export const { setArticlesDraft } = draftSlice.actions;
export default draftSlice.reducer;