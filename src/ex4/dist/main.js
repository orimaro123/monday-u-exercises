const ENTER_KEY = "13";

class Main {
  constructor() {
    this.itemClient = new ItemClient();
    
    this.addItemButton = document.getElementById("list-item-submit");
    this.input = document.getElementById("list-item-input");
    this.loader = document.getElementById("loaderId");
  }

  init = async () => {
    this.addItemButton.addEventListener("click", this.handleItem);

    this.input.addEventListener("keyup", () => {
      if (event.keyCode == ENTER_KEY) {
        this.handleItem();
      }
    });

    await this.renderItems(); // this will make it so that any time you refresh the page you'll see the items already in your todo list
  };

  handleItem = async () => {
    if (this.input.value.trim() === "") {
      this.clearInput(this.input);
      return alert("There is no input");
    }
    //const results = this.parser.parseInputValue(this.input.value);
    //const parserBackEnd = this.itemClient.parseInputValue(this.input.value)

    //this.loader.classList.remove("display");
    //this.itemClient.createItem(dictionary.tasks);
    //this.itemClient.createItem(results)
    /* results.forEach((result) => {
      this.itemClient.createItem(result);
    }); */

    this.itemClient.createItem(this.input.value);
    //console.log(results)
    this.clearInput(this.input);
  };

  clearInput() {
    this.input.value = "";
  }

  deleteItem = async (item) => {
    // implement
    const itemId = item.itemId;

    this.itemClient.deleteItemById(itemId);

    this.loader.classList.remove("display");
  };

  renderItems = async () => {
    const itemsData = await this.itemClient.fetchAllItems();

    const items = itemsData.data;

    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = item.name;

      const listItemDeleteButton = this._createDeleteButton(item);
      listItem.appendChild(listItemDeleteButton);
      listItem.setAttribute("id", item.itemId);
      list.appendChild(listItem);
    });
  };

  _createDeleteButton = (item) => {
    const button = document.createElement("img");
    button.src = "./images/delete_icon.svg";
    button.classList.add("list-item-delete-button");
    button.innerHTML = item.itemId;
    button.addEventListener("click", (_) => this.deleteItem(item));

    return button;
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
