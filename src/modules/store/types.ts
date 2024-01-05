// Определяем типы для actions и состояния
export enum ActionTypes {
    SET_STATUS = 'SET_STATUS',
    SET_START_DATE = 'SET_START_DATE',
    SET_END_DATE = 'SET_END_DATE',
}

export type Status = '' | 'Moderating' | 'Approved' | 'Denied';

export type DateRange = {
    startDate: string;
    endDate: string;
};

// Определяем интерфейсы для actions
interface SetStatusAction {
    type: ActionTypes.SET_STATUS;
    payload: Status;
}

interface SetStartDateAction {
    type: ActionTypes.SET_START_DATE;
    payload: string;
}

interface SetEndDateAction {
    type: ActionTypes.SET_END_DATE;
    payload: string;
}

// Объединяем все типы actions в один
export type StatusActionTypes = SetStatusAction;
export type DateActionTypes = SetStartDateAction | SetEndDateAction;
export type AllActionTypes = StatusActionTypes | DateActionTypes;