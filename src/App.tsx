import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/home",
      element: <HomePage />
    }
  ]);
  
  return <div>
      <RouterProvider router={router} />
    </div>
}

export default App;