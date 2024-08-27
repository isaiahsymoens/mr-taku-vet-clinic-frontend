import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MainLayout from "./layouts/MainLayout";
import UsersPage from "./pages/Users/UsersPage";
import VisitsPage from "./pages/Visits/VisitsPage";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "login",
      element: <LoginPage />
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "users",
          element: <UsersPage />
        },
        {
          path: "visits",
          element: <VisitsPage />
        }
      ]
    }
  ]);
  
  return <div>
      <RouterProvider router={router} />
    </div>
}

export default App;