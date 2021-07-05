import * as React from "react";

export interface IItemProps {
  name: string;
  onDelete: () => void;
}

export default function Item(props: IItemProps) {
  return (
    <div className="d-flex justify-content-between">
      <div>{props.name}</div>
      <div>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={props.onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
