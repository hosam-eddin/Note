import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserContextProvider from "../src/Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NoteContextProvider from "./Context/NoteContext";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <NoteContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </NoteContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
