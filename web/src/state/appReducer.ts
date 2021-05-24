import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "./actions";
import { ADD_ITEM } from "./constants";

export type ItemEntity = {
  id: number;
  name: string;
};

export type AppState = Readonly<{
  items: ReadonlyArray<ItemEntity>;
}>;

export type AppAction = ActionType<typeof actions>;

const initialState: AppState = {
  items: [],
};

const appReducer = createReducer<AppState, AppAction>(initialState).handleType(
  ADD_ITEM,
  (state, action) => ({
    items: [
      ...state.items,
      { id: Math.floor(Math.random() * 1000), name: action.payload },
    ],
  })
);
export default appReducer;
