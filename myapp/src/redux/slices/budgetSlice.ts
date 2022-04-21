import { createSlice } from "@reduxjs/toolkit";

export interface Budget {
    budgetInfo?: {
        budget?: any,
        client?: any,
        tasks?: any,
        imagesRights?: any
    }
}

const initialState: Budget = {
  budgetInfo: null
}

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addBudget(state, action) {
        console.log('adding budget object  ', action.payload)
        return action.payload;
    },
    deleteBudget() {
        return initialState;
    },
    updateBudget(state, action){
        state.budgetInfo = action.payload.budgetInfo
    },
  },
});

export const { addBudget, deleteBudget, updateBudget } = budgetSlice.actions
export default budgetSlice.reducer
