import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import searchSliceReducer from './searchSlice';
import articlesReducer from './articleSlice';
import cartReducer from './cartSlice';
import articleReducer from "./draftArticleSlice";
import { statusReducer, dateReducer } from './articleFiltersSlice';




const rootReducer = combineReducers({
    auth: authReducer,
    searchAuthors: searchSliceReducer,
    articles: articlesReducer,
    cart: cartReducer,
    article: articleReducer,
    status: statusReducer,
    dateRange: dateReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
