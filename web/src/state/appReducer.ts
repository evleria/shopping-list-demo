import { Action } from "redux";
import { ADDED_ITEM, FETCHED_ITEMS, DELETED_ITEM } from "./constants";
import {
  AddedItemAction,
  DeletedItemAction,
  FetchedItemsAction,
} from "./actions";

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

    case DELETED_ITEM: {
      const deletedItemAction = action as DeletedItemAction;
      return {
        items: state.items.filter((i) => i.id !== deletedItemAction.payload),
      };
    }
  }
  return state;
}
