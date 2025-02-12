import Navbar from "./components/shared/Navbar";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  }
])

function App() {
  return (
    <>
      <Theme appearance="light" accentColor="indigo" radius="large">
        <RouterProvider router={appRouter} />
      </Theme>
    </>
  );
}

export default App;
