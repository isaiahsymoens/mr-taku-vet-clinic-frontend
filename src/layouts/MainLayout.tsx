import Header from "../components/Header";
import Navbar from "../components/Navbar";
import {Outlet, useNavigation} from "react-router-dom";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

const MainLayout: React.FC = () => {
    const navigation = useNavigation();

    return (
        <Box sx={{ display: "flex" }}>
            <Header />
            <Navbar />
            {navigation.state === "loading" ? 
                <Box 
                    sx={{
                        width: "100%",
                        height: "100vh",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center"
                    }}
                >
                    <CircularProgress />
                </Box> 
                :
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
            }
            
        </Box>
    );
}

export default MainLayout;