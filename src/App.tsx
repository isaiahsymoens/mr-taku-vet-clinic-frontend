import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MainLayout from "./layouts/MainLayout";
import UsersPage, {loader as usersPageLoader} from "./pages/Users/UsersPage";
import VisitsPage, {loader as visitPageLoader}  from "./pages/Visits/VisitsPage";
import Profile, {loader as profilePageLoader} from "./pages/Profile/Profile";
import AccountPage from "./pages/Account/AccountPage";

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
          element: <UsersPage />,
          loader: usersPageLoader,
        },
        {
          path: "visits",
          element: <VisitsPage />,
          loader: visitPageLoader,
        },
        {
          path: ":username",
          element: <Profile />,
          loader: profilePageLoader,
        },
      ],
    },
    {
      path: "testpage",
      element: <AccountPage />
    }
  ]);
  
  return <div>
      <RouterProvider router={router} />
    </div>
}

export default App;