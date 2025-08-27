import React from "react";
import ReactDOM from 'react-dom/client'; 
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./Main.jsx";
import HomePage from "./Pages/HomePage.jsx";
import SignIn from "./Pages/SignIn.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/SignIn",
        element: <SignIn />,
      },
    ],
  },
],
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

