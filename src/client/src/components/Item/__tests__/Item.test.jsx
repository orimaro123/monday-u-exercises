import { render, screen, cleanup } from "@testing-library/react";
import Item from "../Item";
import ShallowRenderer from "react-test-renderer/shallow";

it("should render item component", () => {
    const renderer = new ShallowRenderer()
  const item = {
    doneAt: null,
    id: 1,
    isPokemon: true,
    itemId: "2435268d-a0d0-49cb-bd59-6c2cacef552a",
    itemName: "Catch bulbasaur",
    pokemonData:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    pokemonId: 1,
    status: false,
  };
 
  const itemElement = renderer. render(<Item item={item}/>);
  expect(itemElement).toMatchSnapshot();
});

it("renders correctly", () => {
    const renderer = new ShallowRenderer();
 
    const item = {
       id: 3,
       text: "Pokemon",
    };
 
    const tree = renderer.render(<Item item={item} />);
    expect(tree).toMatchSnapshot();
 });
