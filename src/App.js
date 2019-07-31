import React from "react";
import "./App.css";
import { Consumer } from "../src/context/index";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Consumer>
          {context => {
            return (
              <div>
                {" "}
                <button onClick={() => context.actions.addBook()}>
                  Add Book
                </button>
                <button onClick={() => context.actions.addMember()}>
                  Add Member
                </button>
                <button onClick={() => context.actions.checkoutBook(0, 0)}>
                  Checkout
                </button>
                <button onClick={() => context.actions.checkinBook(0, 0)}>
                  Checkout
                </button>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default App;
