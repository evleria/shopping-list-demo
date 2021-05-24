import { ADD_ITEM } from "./constants";
import { action } from "typesafe-actions";

export const addItem = (name: string) => action(ADD_ITEM, name);
