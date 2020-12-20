import React from "react";
import { Provider } from "react-redux";
import MyApp from "./MyApp";
import store from "./store/index";

export default function App() {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}
