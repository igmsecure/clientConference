// reducer.ts
interface ArticleState {
    id: number;
}

interface ArticleAction {
    type: string;
    payload?: any;
}

const initialState: ArticleState = {
    id: 0
};

const articleReducer = (state = initialState, action: ArticleAction): ArticleState => {
    switch (action.type) {
        case "SET_ARTICLE_ID":
            return {
                ...state,
                id: action.payload
            };
        case "CLEAR_ARTICLE_ID":
            return initialState;
        default:
            return state;
    }
};

export default articleReducer;
