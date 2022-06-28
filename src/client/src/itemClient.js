import axios from "axios";

const URL = "http://localhost:8080";

export async function fetchAllItems() {
  const urlFetchAllItems = `${URL}/item/`;

  const errorResponse = {
    error: true,

    description: `Items were not found`,
  };
  try {
    const response = await fetch(urlFetchAllItems);

    if (!response.ok) {
      return errorResponse;
    }
    const json = await response.json();

    return {
      error: false,
      data: json,
      description: `Items with ${json} data`,
    };
  } catch (error) {
    console.log("this is error fetching the items");

    return errorResponse;
  }
}

export async function deleteItemById(itemId) {
  const urlDeleteItem = `${URL}/item/delete_item/${itemId}/`;

  try {
    await fetch(urlDeleteItem, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw new Error("failed to delete item");
  }
}

export async function createItem(input) {
  const urlCreateItem = URL + `/item/create_item/`;

  try {
    const response = await axios.post(urlCreateItem, { data: input });

    return response;
  } catch (e) {
    console.log("this is error creating item", e);
  }
}

export async function updateStatusInDb(itemId, newStatus) {
  const urlUpdateItem = `${URL}/item/update_status/${itemId}/${newStatus}`;

  try {
    const response = await axios.put(urlUpdateItem, {
      itemId: itemId,
      newStatus: newStatus,
    });
  } catch (err) {
    throw new Error("failed to update item");
  }
}

export async function updateDoneTimestamp(itemId, timestamp) {
  const urlUpdateItem = `${URL}/item/update_done_timestamp/${itemId}/${timestamp}`;

  try {
    const response = await axios.put(urlUpdateItem, {
      itemId: itemId,
      timestamp: timestamp,
    });
  } catch (err) {
    throw new Error("failed to update done timestamp");
  }
}

export async function updateNameInDb(itemId, newName) {
  const urlUpdateItem = `${URL}/item/update_name/${itemId}/${newName}`;

  try {
    const response = await axios.put(urlUpdateItem, {
      itemId: itemId,
      newName: newName,
    });
  } catch (err) {
    throw new Error("failed to update name");
  }
}
