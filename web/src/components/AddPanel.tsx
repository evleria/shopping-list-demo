import * as React from "react";

export interface IAddPanelProps {}

export default function AddPanel(props: IAddPanelProps) {
  return (
    <div className="input-group">
      <input
        className="form-control rounded"
        placeholder="Input new item name ..."
        aria-label="Add new item"
      />
      <button type="button" className="btn btn-outline-primary">
        Add new item
      </button>
    </div>
  );
}
