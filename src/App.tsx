import Home from "./Home";
import AboutDSL from "./AboutDSL/AboutDSL";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/about",
    Component: AboutDSL,
  },
  {
    path: "*",
    Component: Home,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
