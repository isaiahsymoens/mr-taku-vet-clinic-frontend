import React from "react";
import {TextField} from "@mui/material";

export interface UserData {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    petOwned: number;
    username: string;
    password: string;
    confirmPassword: string;
    userType: string;
    active: boolean;
}

type UserFormProps = {
    type: "Add" | "Edit";
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
                {type == "Add" && 
                    <React.Fragment>
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            value={userData.email}
                            onChange={(e) => handleFormChange("email", e.target.value)}  
                            size="small" 
                            fullWidth 
                        />
                        <TextField 
                            label="Username" 
                            variant="outlined" 
                            value={userData.username} 
                            onChange={(e) => handleFormChange("username", e.target.value)}  
                            size="small" 
                            fullWidth 
                        />
                    </React.Fragment>}
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    value={userData.password} 
                    onChange={(e) => handleFormChange("password", e.target.value)}  
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Confirm Password" 
                    variant="outlined" 
                    value={userData.confirmPassword} 
                    onChange={(e) => handleFormChange("confirmPassword", e.target.value)}  
                    size="small" 
                    fullWidth 
                />
        </React.Fragment>
    );
}

export default UserForm;