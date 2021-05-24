import * as React from "react";
import { connect } from "react-redux";
import Item from "./Item";
import { AppState, ItemEntity } from "../state/appReducer";

export interface IItemsListProps {
  items: ReadonlyArray<ItemEntity>;
}

function ItemsList(props: IItemsListProps) {
  return (
    <ul className="list-group py-1">
      {props.items.map((item) => (
        <li className="list-group-item">
          <Item key={item.id} name={item.name} />
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps = (state: AppState) => ({
  items: state.items,
});

export default connect(mapStateToProps)(ItemsList);
