import Header from "../../components/Header";
import {Outlet, Link} from "react-router-dom";

const HomePage: React.FC = () => {
    return <div>
        <Header />
        <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/visits">Visits</Link></li>
        </nav>
        <main>
            <Outlet />
        </main>
    </div>
}

export default HomePage;