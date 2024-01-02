import appSlice from "../slices/appSlice";

const { clearError } = appSlice.actions;

export const clearErrorAction = () => (dispatch) => {
    dispatch(clearError());
}
