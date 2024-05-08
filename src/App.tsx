import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import RootLayout from "./layouts/RootLayout";
import { DataProvider } from "./contexts/DataContext";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
);

const App: React.FC = () => {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
};

export default App;
