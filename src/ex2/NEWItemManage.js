//import Item from "./ItemClass.js";
//import PokemonClient from "./PokemonClient.js";
import Item from "./NEWItem.js";
class ItemManager {

    constructor(){
        this.itemList = []
    }



     addToItemList(itemTextValue,itemID, isPokemon) {
        this.item = new Item(itemTextValue, itemID, isPokemon);
        this.itemList.push(this.item);
      }

      removeFromItemList(textItem, itemID){
        this.itemList = this.itemList.filter((item) => item.id != itemID);
      }












} 
export default ItemManager;