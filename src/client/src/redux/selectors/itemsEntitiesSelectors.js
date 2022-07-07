const getItemsEntities = state => state.itemsEntities;

export const getItemsCount = (state) => getItemsEntities(state).itemsCount;
export const getItems = (state) => getItemsEntities(state).items;

export const getQuery = (state) => state.itemsEntities.query;
export const getQueryName = (state) => state?.itemsEntities?.query?.name ?? ''