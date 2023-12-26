// actions.ts
import { ActionTypes, Status, DateRange } from './types';

export const setArticleId = (id: number) => {
    return {
        type: "SET_ARTICLE_ID",
        payload: id
    };
};

export const clearArticleId = () => {
    return {
        type: "CLEAR_ARTICLE_ID"
    };
};


// Создаем action для установки выбранного статуса
export const setStatus = (status: Status) => ({
    type: ActionTypes.SET_STATUS,
    payload: status,
});


// Создаем action для установки начальной даты
export const setStartDate = (date: string) => ({
    type: ActionTypes.SET_START_DATE,
    payload: date,
});

// Создаем action для установки конечной даты
export const setEndDate = (date: string) => ({
    type: ActionTypes.SET_END_DATE,
    payload: date,
});
