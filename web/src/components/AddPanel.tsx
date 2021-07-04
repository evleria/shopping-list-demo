import * as React from "react";
import { createRef } from "react";
import { connect } from "react-redux";

export interface IAddPanelProps {}

function AddPanel(props: IAddPanelProps) {
  const input = createRef<HTMLInputElement>();
  const handleOnAdd = () => {
    if (input.current) {
      const name = input.current.value.trim();
      if (name) {
        console.log(`adding item ${name}`);
      }
    }
  };

  return (
    <div className="input-group">
      <input
        className="form-control rounded"
        placeholder="Input new item name ..."
        aria-label="Add new item"
        ref={input}
      />
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handleOnAdd}
      >
        Add new item
      </button>
    </div>
  );
}

export default connect(null, null)(AddPanel);
