import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { FETCHED_ITEMS, FETCHING_ITEMS } from "./constants";
import { IAppState } from "./appReducer";
import * as api from "../api/api";

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

const fetchingItems: ActionCreator<Action> = () => {
  return {
    type: FETCHING_ITEMS,
  };
};

export type FetchedItemsAction = ActionWithPayload<api.Item[]>;
const fetchedItems: ActionCreator<FetchedItemsAction> = (items: api.Item[]) => {
  return {
    type: FETCHED_ITEMS,
    payload: items,
  };
};

export const fetchItems: ActionCreator<
  ThunkAction<void, IAppState, unknown, Action>
> = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchingItems());
    const data = await api.getItems();
    dispatch(fetchedItems(data));
  };
};
