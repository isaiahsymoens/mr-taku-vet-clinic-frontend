import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MainLayout from "./layouts/MainLayout";
import UsersPage from "./pages/Users/UsersPage";
import VisitsPage from "./pages/Visits/VisitsPage";
import Test from "./pages/Test/TestPage";
import Profile from "./pages/Profile/Profile";

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
        },
        {
          path: ":username",
          element: <Profile />
        },
      ]
    },
    {
      path: "testpage",
      element: <Test />
    }
  ]);
  
  return <div>
      <RouterProvider router={router} />
    </div>
}

export default App;