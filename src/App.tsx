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
  return (
    <div className="bg-[#222] min-h-screen min-w-[320px] m-0 text-white items-center flex flex-col pt-8">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
