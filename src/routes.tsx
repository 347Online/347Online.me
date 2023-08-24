import { RouteObject } from "react-router-dom";
import Scramble from "./pages/Scramble/Scramble";
import Landing from "./pages/Landing";
import Social from "./pages/Social";
import NotFound from "./pages/NotFound";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />
  },
  {
    path: "/social",
    element: <Social />,
  },
  {
    path: "/cube/scramble",
    element: <Scramble />,
  },
];

export default routes;
