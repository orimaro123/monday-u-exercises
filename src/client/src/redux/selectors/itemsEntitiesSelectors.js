const getItemsEntities = state => state.itemsEntities;

export const getItemsCount = (state) => getItemsEntities(state).itemsCount;
export const getItems = (state) => getItemsEntities(state).items;