import { Action } from "redux";
import { ADDED_ITEM, FETCHED_ITEMS } from "./constants";
import { AddedItemAction, FetchedItemsAction } from "./actions";

export type ItemEntity = {
  id: number;
  name: string;
  createdAt: string;
};

export interface AppState {
  items: ItemEntity[];
}

const initialState: AppState = {
  items: [],
};

export default function appReducer(
  state: AppState = initialState,
  action: Action
): AppState {
  switch (action.type) {
    case FETCHED_ITEMS: {
      const fetchedItemsAction = action as FetchedItemsAction;
      return {
        items: [...fetchedItemsAction.payload],
      };
    }

    case ADDED_ITEM: {
      const addedItemAction = action as AddedItemAction;
      return {
        items: [...state.items, addedItemAction.payload],
      };
    }
  }

  return state;
}
