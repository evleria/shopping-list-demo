import React from "react";
import AddPanel from "./AddPanel";
import ItemsList from "./ItemsList";

function App() {
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-8 offset-2">
          <h3>Shopping List</h3>

          <AddPanel />
          <ItemsList />
        </div>
      </div>
    </div>
  );
}

export default App;
