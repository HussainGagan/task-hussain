import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provider uses react context under the hood and will provide the store to every component in our application */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
