import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./Main.jsx";
import HomePage from "./Pages/HomePage.jsx";
import SignIn from "./Pages/SignIn.jsx";
import User from "./Pages/user.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/SignIn", element: <SignIn />},
      {path: "/User", element: <User />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
