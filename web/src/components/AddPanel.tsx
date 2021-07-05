import * as React from "react";
import { createRef } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../state/appReducer";
import { Action } from "redux";
import { addItem } from "../state/actions";

export interface IAddPanelProps {
  addItem: (name: string) => void;
}

function AddPanel(props: IAddPanelProps) {
  const input = createRef<HTMLInputElement>();
  const handleOnAdd = () => {
    if (input.current) {
      const name = input.current.value.trim();
      if (name) {
        input.current.value = "";
        props.addItem(name);
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

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, unknown, Action>
) => ({
  addItem: (name: string) => dispatch(addItem(name)),
});

export default connect(null, mapDispatchToProps)(AddPanel);
