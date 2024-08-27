import Header from "../components/Header";
import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";
import Box from "@mui/material/Box";

const MainLayout: React.FC = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Header />
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default MainLayout;