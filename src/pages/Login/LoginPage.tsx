import {Box, Typography, TextField, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return <Box sx={{width: "100vw", height: "100vh", background: "#ebebeb"}}>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh"
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: "400px",
                height: "300px",
                boxShadow: "10px",
                background: "#FFF",
                margin: {xs: "0 10px", sm: "0"},
                borderRadius: {xs: ".5em", sm: "0"}
            }}>
                <Box sx={{
                    background: "#3771d0",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: {xs: ".5em", sm: "0"},
                    borderTopRightRadius: {xs: ".5em", sm: "0"}
                }}>
                    <Typography variant="h2" sx={{ fontSize: "1.7rem", color: "#FFF", fontWeight: "700" }}>
                        <span style={{ fontWeight: "100" }}>Mr. Taku</span>VET Clinic
                    </Typography>
                </Box>  
                <form style={{
                    maxWidth: "85%",
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                    gap: "20px",
                    marginTop: "30px"
                }}>
                    <TextField label="Username" variant="outlined" size="small" />
                    <TextField label="Password" variant="outlined" size="small"/>
                    <Button variant="contained"
                        onClick={() => navigate("home")}
                    >Login</Button>
                </form>
            </Box>
        </Box>
    </Box>
}

export default LoginPage;