import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "../../../store";
import List from "../List";
import AppContainer from "../../AppContainer/AppContainer";

const items = [
  {
    id: 56,
    itemName: "Take dog out for a walk",
    text: "Take dog out for a walk",
    status: false,
    doneAt: "2022-07-13 07:31:33",
  },
  {
    id: 32,
    itemName: "Do the dishes",
    text: "Do the dishes",
    status: true,
    doneAt: "2022-07-13 09:31:33",
  },
];

describe("List", () => {
  test("should render both items (one done and one not)", () => {
    render(
      <Provider store={store}>
        <List items={items} fetchItems={jest.fn(() => items)} />
      </Provider>
    );

    const item1 = screen.getByTestId(`item-${items[0].id}`);
    const item2 = screen.getByTestId(`item-${items[1].id}`);

    expect(item1).toBeInTheDocument();
    expect(item1).toMatchSnapshot();
    expect(item2).toBeInTheDocument();
    expect(item2).toMatchSnapshot();
  });

  test("should call fetchItems function", () => {
    const getItemsAction = jest.fn(() => items);
    render(
      <Provider store={store}>
        <AppContainer items={items} getItemsAction={getItemsAction} />
      </Provider>
    );
    expect(getItemsAction).toHaveBeenCalled();
  });
});
