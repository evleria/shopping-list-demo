import { Action } from "redux";
import { FETCHED_ITEMS } from "./constants";
import { FetchedItemsAction } from "./actions";

export type ItemEntity = {
  id: number;
  name: string;
  createdAt: string;
};

export interface IAppState {
  items: ItemEntity[];
}

const initialState: IAppState = {
  items: [],
};

export default function appReducer(
  state: IAppState = initialState,
  action: Action
): IAppState {
  switch (action.type) {
    case FETCHED_ITEMS: {
      const fetchedItemsAction = action as FetchedItemsAction;
      return {
        items: [...fetchedItemsAction.payload],
      };
    }
  }

  return state;
}
