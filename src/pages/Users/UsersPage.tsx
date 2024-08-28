import React, { useEffect, useState } from "react";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import {Box, TextField} from "@mui/material";

const tableData = {
    tableHeaders: [
        {label: "Name", field: "name"},
        {label: "Email", field: "email"},
        {label: "Pet Owned", field: "petOwned"},
    ],
    tableBody: [
        {email: "test@gmail.com", name: "Test test", petOwned: 0},
        {email: "test1@gmail.com", name: "Test test 1", petOwned: 1},
        {email: "test2@gmail.com", name: "Test test 2", petOwned: 2},
        {email: "test@gmail.com", name: "Test test", petOwned: 0},
        {email: "test1@gmail.com", name: "Test test 1", petOwned: 1},
        {email: "test2@gmail.com", name: "Test test 2", petOwned: 2},
        {email: "test@gmail.com", name: "Test test", petOwned: 0},
        {email: "test1@gmail.com", name: "Test test 1", petOwned: 1},
        {email: "test2@gmail.com", name: "Test test 2", petOwned: 2},
    ],
}

interface UserData {
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

const initialState: UserData = {
    firstName: "", 
    middleName: "", 
    lastName: "", 
    email: "", 
    petOwned: 0, 
    username: "",
    password: "",
    confirmPassword: "",
    userType: "",
    active: false,
}

const UsersPage: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>(initialState);

    useEffect(() => {
        // TODO: use api
        // setUserData();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const handleFormChange = (key: keyof UserData, value: any) => {
        setUserData((prevData) => ({...prevData, [key]: value}));
    }

    const handleSave = () => {
    }
    
    return (
        <React.Fragment>
            <SubHeader text="Users" showSearchbar={true} btnText="Add User" toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomTable tableHeaders={tableData.tableHeaders} tableBody={tableData.tableBody}/>
            </Box>
            <CustomDrawer 
                open={isDrawerOpen} 
                onClose={toggleDrawer} 
                onCancel={toggleDrawer} 
                onSave={handleSave} 
                drawerHeader="Add User"
            >
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
            </CustomDrawer>
        </React.Fragment>
    );
}

export default UsersPage;