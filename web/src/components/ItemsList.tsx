import * as React from "react";
import Item from "./Item";

export interface IItemsListProps {}

export default function ItemsList(props: IItemsListProps) {
  return (
    <ul className="list-group py-1">
      <li className="list-group-item">
        <Item />
      </li>
      <li className="list-group-item">
        <Item />
      </li>
    </ul>
  );
}
