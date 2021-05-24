import * as React from "react";
import { connect } from "react-redux";
import { addItem } from "../state/actions";
import { createRef } from "react";

export interface IAddPanelProps {
  onAdd: (name: string) => void;
}

function AddPanel(props: IAddPanelProps) {
  const input = createRef<HTMLInputElement>();
  const handleOnAdd = () => {
    if (input.current) {
      const name = input.current.value.trim();
      if (name) {
        props.onAdd(name);
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

const dispatchToProps = {
  onAdd: addItem,
};

export default connect(null, dispatchToProps)(AddPanel);
