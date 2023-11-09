import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";

import Dashboard from "./Pages/Dashboard";
import Expense from "./Pages/Expense";
import Income from "./Pages/Income";
import NotFound from "./Pages/NotFound";
import UserProfile from "./Pages/UserProfile";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.data.user !== null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: isLoggedIn ? <Dashboard /> : <Home />,
        },
        {
          path: "dashboard",
          element: isLoggedIn ? <Dashboard /> : <Navigate to="/" />,
        },
        {
          path: "userprofile",
          element: isLoggedIn ? <UserProfile /> : <Navigate to="/" />,
        },
        {
          path: "incomes",
          element: isLoggedIn ? <Income /> : <Navigate to="/" />,
        },
        {
          path: "expenses",
          element: isLoggedIn ? <Expense /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
