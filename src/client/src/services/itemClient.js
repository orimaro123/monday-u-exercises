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
    const response = await fetch(urlCreateItem, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: input }),
    });

    let items = await response.json();

    return items;
  } catch (e) {
    throw new Error("failed to create item");
  }
}

export async function clearAll() {
  const urlClearAll = URL + `/item/`;

  try {
    const response = await fetch(urlClearAll, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: "clear all" }),
    });

    return response;
  } catch (e) {
    console.log("this is error clearing all", e);
  }
}

export async function updateStatusInDb(itemId, newStatus) {
  const urlUpdateItemStatus = `${URL}/item/update_status/${itemId}/${newStatus}`;

  try {
    const response = await fetch(urlUpdateItemStatus, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: itemId,
        newStatus: newStatus,
      }),
    });
  } catch (err) {
    throw new Error("failed to update status");
  }
}

export async function updateDoneTimestamp(itemId, timestamp) {
  const urlUpdateItemTimestamp = `${URL}/item/update_done_timestamp/${itemId}/${timestamp}`;

  try {
    await fetch(urlUpdateItemTimestamp, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: itemId,
        timestamp: timestamp,
      }),
    });
  } catch (err) {
    throw new Error("failed to update done timestamp");
  }
}

export async function updateNameInDb(itemId, newName) {
  const urlUpdateItemName = `${URL}/item/update_name/${itemId}/${newName}`;

  try {
    const response = await fetch(urlUpdateItemName, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: itemId,
        newName: newName,
      }),
    });
    const nameToReact = await response.json();

    return nameToReact;
  } catch (err) {
    throw new Error("failed to update name");
  }
}
