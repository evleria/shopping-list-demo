import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import * as constants from "./constants";
import { AppState } from "./appReducer";
import * as api from "../api/api";

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

const fetchingItems: ActionCreator<Action> = () => {
  return {
    type: constants.FETCHING_ITEMS,
  };
};

export type FetchedItemsAction = ActionWithPayload<api.Item[]>;
const fetchedItems: ActionCreator<FetchedItemsAction> = (items: api.Item[]) => {
  return {
    type: constants.FETCHED_ITEMS,
    payload: items,
  };
};

export const fetchItems: ActionCreator<
  ThunkAction<void, AppState, unknown, Action>
> = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchingItems());
    const data = await api.getItems();
    dispatch(fetchedItems(data));
  };
};

const addingItem: ActionCreator<Action> = () => {
  return {
    type: constants.ADDING_ITEM,
  };
};

export type AddedItemAction = ActionWithPayload<api.Item>;
const addedItem: ActionCreator<AddedItemAction> = (item: api.Item) => {
  return {
    type: constants.ADDED_ITEM,
    payload: item,
  };
};

export const addItem: ActionCreator<
  ThunkAction<void, AppState, unknown, Action>
> = (name: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(addingItem());
    const data = await api.addItem(name);
    dispatch(addedItem(data));
  };
};
