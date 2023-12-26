import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    id: number | null;
    username: string | null;
    email: string | null;
    isAuthenticated: boolean;
    isModerator: boolean;
}

const initialState: AuthState = {
    id: null,
    username: null,
    email: null,
    isAuthenticated: false,
    isModerator: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<AuthState>) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isModerator = action.payload.isModerator;
        },
        clearAuthData(state) {
            state.id = null;
            state.username = null;
            state.email = null;
            state.isAuthenticated = false;
            state.isModerator = false;
        },
    },
});


export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;


















// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     user_id: -1,
//     user_username: "",
//     user_email: "",
//     is_authenticated: false,
//     is_moderator: false,
// }

// const authSlice = createSlice({
//     name: 'user',
//     initialState: initialState,
//     reducers: {
//         updateUser: (state, action) => {
//             state.is_authenticated = action.payload.is_authenticated
//             state.is_moderator = action.payload.is_moderator
//             state.user_id = action.payload.user_id
//             state.user_username = action.payload.user_username
//             state.user_email = action.payload.user_email
//         },
//         cleanUser: (state) => {
//             state.is_authenticated = false
//             state.is_moderator = false
//             state.user_id = -1
//             state.user_username = ""
//             state.user_email = ""
//         }
//     }
// })

// export const { updateUser, cleanUser } = authSlice.actions

// export default authSlice.reducer