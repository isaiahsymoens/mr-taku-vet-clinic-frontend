import React from "react";
import {Box, Divider, Switch, TextField, Typography} from "@mui/material";
import {DrawerPanelActions} from "../../components/DrawerPanel";

export interface UserData {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    petOwned?: number;
    username?: string;
    password?: string;
    userType?: string;
    active?: boolean;
}

type UserFormProps = {
    type: DrawerPanelActions;
    userData: UserData;
    handleFormChange: (key: keyof UserData, value: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({type, userData, handleFormChange}) => {
    return (
        <React.Fragment>
            <TextField 
                    label="First Name" 
                    variant="outlined" 
                    value={userData.firstName}
                    onChange={(e) => handleFormChange("firstName", e.target.value)} 
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Middle Name" 
                    variant="outlined" 
                    value={userData.middleName}
                    onChange={(e) => handleFormChange("middleName", e.target.value)}  
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Last Name" 
                    variant="outlined" 
                    value={userData.lastName} 
                    onChange={(e) => handleFormChange("lastName", e.target.value)} 
                    size="small" 
                    fullWidth 
                />
                {type == DrawerPanelActions.Add && 
                    <React.Fragment>
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            value={userData.email}
                            onChange={(e) => handleFormChange("email", e.target.value)}  
                            size="small" 
                            fullWidth 
                        />
                        {/* <Box sx={{display: "flex", alignItems: "center"}}>
                            <Switch checked={userData.active} onChange={(e) => handleFormChange("active", e.target.value)} />
                            <Typography variant="body2">Active</Typography>
                        </Box> */}
                        <Divider />
                        <TextField 
                            label="Username" 
                            variant="outlined" 
                            value={userData.email?.split("@")[0]}   
                            size="small" 
                            disabled
                            fullWidth 
                        />
                    </React.Fragment>
                }
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    value={userData.password} 
                    onChange={(e) => handleFormChange("password", e.target.value)}  
                    size="small" 
                    fullWidth 
                />
        </React.Fragment>
    );
}

export default UserForm;