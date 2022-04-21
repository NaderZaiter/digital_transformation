import { createSlice } from "@reduxjs/toolkit";

export interface ImageRights {
    imageRights?: any
}

const initialState: ImageRights = {
  imageRights: null
}

const imagesRightsSlice = createSlice({
  name: "imageRights",
  initialState,
  reducers: {
    addImageRights(state, action) {
        console.log('adding budget object  ', action.payload)
        return action.payload;
    },
    deleteImageRights() {
        return initialState;
    },
    updateImageRights(state, action){
        state.imageRights = action.payload.imageRights
    },
  },
});

export const { addImageRights, deleteImageRights, updateImageRights } = imagesRightsSlice.actions
export default imagesRightsSlice.reducer
