import React from "react";
import {Box, Typography, Button} from "@mui/material";

type ProfileCardProps = {
    user: any;
    toggleUserDrawer: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({user, toggleUserDrawer}) => {
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
            <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                height={150}
                style={{
                    width: "100%",
                    maxWidth: "150px",
                    borderRadius: "10em"
                }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingY: 2 }}>
                <Typography variant="subtitle2">{`${user?.firstName} ${user?.middleName} ${user?.lastName}`}</Typography>
                <Typography variant="body2" sx={{ paddingBottom: 1.5 }}>{user?.email}</Typography>
                <Button variant="contained" onClick={toggleUserDrawer}>Edit Profile</Button>
            </Box>
        </Box>
    );
}

export default ProfileCard;