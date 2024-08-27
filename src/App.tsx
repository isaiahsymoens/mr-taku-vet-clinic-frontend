import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
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
      element: <HomePage />,
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