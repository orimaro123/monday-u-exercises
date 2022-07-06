const getItemsView = (state) => state.itemsView;

export const getShowLoader = (state) => getItemsView(state).showLoader;
export const getShowClearButton = (state) => getItemsView(state).showClearButton;
export const getShowToastValue = (state) => getItemsView(state).showToastValue