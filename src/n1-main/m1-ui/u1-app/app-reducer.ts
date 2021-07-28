// Actions
const SET_ERROR = 'friday_teamwork_project/app-reducer/SET_ERROR';

// Types
export type ErrorType = null | string;
export type SetAppErrorAT = ReturnType<typeof setAppError>;
export type AppActionsType = SetAppErrorAT;
export type InitialStateType = typeof initialState;

//Initial State
const initialState = {
    error: null as ErrorType,
}

// Reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

// Action Creators
export const setAppError = (error: ErrorType) => ({type: SET_ERROR, error}) as const;