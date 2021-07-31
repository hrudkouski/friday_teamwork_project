// Actions
const SET_ERROR = 'friday_teamwork_project/app-reducer/SET_ERROR';
const CHANGE_STATUS = 'friday_teamwork_project/app-reducer/CHANGE_STATUS';

// Types
export type ErrorType = null | string;
export type SetAppErrorAT = ReturnType<typeof setAppError>;
export type ChangeStatusAT = ReturnType<typeof changeStatusAC>;
export type AppActionsType = SetAppErrorAT | ChangeStatusAT;
export type InitialStateType = typeof initialState;
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//Initial State
const initialState = {
    error: null as ErrorType,
    status: 'idle' as StatusType
}

// Reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}
        case CHANGE_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

// Action Creators
export const setAppError = (error: ErrorType) => ({type: SET_ERROR, error}) as const;
export const changeStatusAC = (status: StatusType) =>
    ({type: CHANGE_STATUS, status} as const)