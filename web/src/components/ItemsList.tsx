import React, { useEffect } from "react";
import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Item from "./Item";
import { AppState, ItemEntity } from "../state/appReducer";
import { fetchItems, deleteItem } from "../state/actions";

export interface IItemsListProps {
  items: ItemEntity[];
  fetchItems: () => void;
  deleteItem: (id: number) => void;
}

function ItemsList(props: IItemsListProps) {
  useEffect(() => {
    props.fetchItems();
  }, []);

  return (
    <ul className="list-group py-1">
      {props.items.map((item) => (
        <li className="list-group-item">
          <Item
            key={item.id}
            name={item.name}
            onDelete={() => props.deleteItem(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps = (state: AppState) => ({
  items: state.items,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, unknown, Action>
) => ({
  fetchItems: () => dispatch(fetchItems()),
  deleteItem: (id: number) => dispatch(deleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
