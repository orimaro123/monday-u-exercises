const getItemsView = (state) => state.itemsView;

export const getShowLoader = (state) => getItemsView(state).showLoader;
export const getShowClearButton = (state) => getItemsView(state).showClearButton;
export const getShowToast = (state) => getItemsView(state).showToast;
export const getToastContent = (state) => getItemsView(state).toastContent ;
export const getToastOrientation = (state) => getItemsView(state).toastOrientation ;



