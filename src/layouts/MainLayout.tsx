import Header from "../components/Header";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout: React.FC = () => {
    return <div>
        <Header />
        <Navbar />
        <main>
            <Outlet />
        </main>
    </div>
}

export default MainLayout;