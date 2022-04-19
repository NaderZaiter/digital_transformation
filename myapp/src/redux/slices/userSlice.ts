import { createSlice } from "@reduxjs/toolkit";

export interface User {
    userProfile?: {
        id?: string;
        firstName?: string;
        lastName?: string;
        profileImage?: string;
        profile_picture_url?: string;
        is_available?: number;
        permission?: number;
        user?: string,
        password?: string
        token?: string;
    }
}

const initialState: User = {
  userProfile: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
        console.log('adding user object  ', action.payload)
        return action.payload;
    },
    deleteUser() {
        return initialState;
    },
    updateUserProfile(state, action){
        state.userProfile = action.payload.userProfile
    },
  },
});

export const { addUser, deleteUser, updateUserProfile } = userSlice.actions
export default userSlice.reducer
