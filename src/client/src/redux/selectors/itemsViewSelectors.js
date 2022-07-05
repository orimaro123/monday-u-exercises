const getItemsView = (state) => state.itemsView;

export const getShowLoader = (state) => getItemsView(state).showLoader;
export const getShowClearButton = (state) => getItemsView(state).showClearButton;
export const getOpenCloseToast = (state) => getItemsView(state).openToast