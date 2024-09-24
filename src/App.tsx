import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MainLayout from "./layouts/MainLayout";
import UsersPage, {loader as usersPageLoader} from "./pages/Users/UsersPage";
import VisitsPage, {loader as visitPageLoader}  from "./pages/Visits/VisitsPage";
import Profile, {loader as profilePageLoader} from "./pages/Profile/Profile";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "login",
      element: <ProtectedRoute element={<LoginPage />} />
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "users",
          element: <ProtectedRoute element={<UsersPage />} />,
          loader: usersPageLoader,
        },
        {
          path: "visits",
          element: <ProtectedRoute element={<VisitsPage />} />,
          loader: visitPageLoader,
        },
        {
          path: ":username",
          element: <ProtectedRoute element={<Profile />} />,
          loader: profilePageLoader,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ]);
  
  return <div>
      <RouterProvider router={router} />
    </div>
}

export default App;