import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./Main.jsx";
import {HomePage, SignIn, User, AccountsId} from './Pages/IndexPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/SignIn", element: <SignIn />},
      {path: "/User", element: <User />},
      {path: "/accountsId/:id", element: <AccountsId />},
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
