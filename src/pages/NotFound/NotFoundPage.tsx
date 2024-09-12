import React, {useEffect} from "react";
import notFoundImg from "../../assets/images/undraw_page_not_found_re_e9o6.svg";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/users");
        }, 3000);
    }, []);

    return (
        <React.Fragment>
            <Box sx={{
                    width: "100vw", 
                    height: "100vh",
                    display: "flex",  
                    justifyContent: "center"
                }}
            >
                <img 
                    src={notFoundImg} 
                    alt="404 Not Found"
                    style={{
                        width: "100%",
                        maxWidth: "560px",
                        marginTop: "-100px"
                    }}    
                />
            </Box>
        </React.Fragment>
    );
}

export default NotFoundPage;