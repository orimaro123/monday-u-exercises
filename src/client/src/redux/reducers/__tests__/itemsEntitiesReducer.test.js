import itemsEntitiesReducer from "../itemsEntitiesReducer";
import actionTypes from "../../actions/constants";

test("should return the initial state", () => {
  expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual({
    items: [],
    query: {
      status: undefined,
      name: "",
    },
  });
});

test("should test a task being added to an empty list", () => {
  const previousState = { items: [] };
  const action = {
    type: actionTypes.ADD_ITEMS,
    data: [{ id: 1, text: "A todo" }],
  };

  expect(itemsEntitiesReducer(previousState, action)).toEqual({
    items: [{ id: 1, text: "A todo" }],
  });
});

test("should test a task being added to an existing list", () => {
  const previousState = {
    items: [{ id: 1, text: "A todo" }],
  };
  const action = {
    type: actionTypes.ADD_ITEMS,
    data: [{ id: 2, text: "A new todo" }],
  };

  expect(itemsEntitiesReducer(previousState, action)).toEqual({
    items: [
      { id: 1, text: "A todo" },
      { id: 2, text: "A new todo" },
    ],
  });
});

test("should test clear all tasks from an existing list", () => {
  const previousState = {
    items: [
      { id: 1, text: "A todo" },
      { id: 2, text: "A new todo" },
    ],
  };
  const action = {
    type: actionTypes.CLEAR_ALL_ITEMS,
  };

  expect(itemsEntitiesReducer(previousState, action)).toEqual({
    items: [],
  });
});

test("should delete an item from an existing list", () => {
  const previousState = {
    items: [
      { itemId: 1, text: "A todo" },
      { itemId: 2, text: "A new todo" },
    ],
  };
  const action = {
    type: actionTypes.DELETE_ITEM,
    payload: 1,
  };

  expect(itemsEntitiesReducer(previousState, action)).toEqual({
    items: [{ itemId: 2, text: "A new todo" }],
  });
});


