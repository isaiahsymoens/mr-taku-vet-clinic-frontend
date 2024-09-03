import React from "react";
import {Box, Typography, Button} from "@mui/material";

type ProfileCardProps = {
    toggleUserDrawer: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({toggleUserDrawer}) => {
    return (
        <Box sx={{ 
            width: {
                xs: "100%",
                md: "30%",
            }, 
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center" 
        }}>
            <img src="https://cdn.pixabay.com/photo/2024/03/16/20/35/ai-generated-8637800_1280.jpg"
                height={150}
                style={{
                    width: "100%",
                    maxWidth: "150px",
                    borderRadius: "10em"
                }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingY: 2 }}>
                <Typography variant="subtitle2">Monkey D. Luffy</Typography>
                <Typography variant="body2" sx={{ paddingBottom: 1.5 }}>monkeydluffy@gmail.com</Typography>
                <Button variant="contained" onClick={toggleUserDrawer}>Edit Profile</Button>
            </Box>
        </Box>
    );
}

export default ProfileCard;