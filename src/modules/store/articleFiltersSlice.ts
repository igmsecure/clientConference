// Создаем reducer для управления выбранным значением status
import { ActionTypes, StatusActionTypes, Status, DateRange, DateActionTypes } from './types';

const initialState: Status = '';

export const statusReducer = (state = initialState, action: StatusActionTypes): Status => {
    switch (action.type) {
        case ActionTypes.SET_STATUS:
            return action.payload;
        default:
            return state;
    }
};

// Создаем reducer для управления выбранными значениями start и end date

const initialDateRange: DateRange = {
    startDate: '',
    endDate: '',
};

export const dateReducer = (state = initialDateRange, action: DateActionTypes): DateRange => {
    switch (action.type) {
        case ActionTypes.SET_START_DATE:
            return { ...state, startDate: action.payload };
        case ActionTypes.SET_END_DATE:
            return { ...state, endDate: action.payload };
        default:
            return state;
    }
};