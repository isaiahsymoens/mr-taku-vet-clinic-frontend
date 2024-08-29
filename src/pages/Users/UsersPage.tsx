import React, { useEffect, useState } from "react";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import {Box} from "@mui/material";
import UserForm, {UserData} from "./UserForm";

const tableData = {
    tableHeaders: [
        {label: "Name", field: "name"},
        {label: "Email", field: "email"},
        {label: "Pet Owned", field: "petOwned"},
    ],
    tableBody: [
        {email: "test@gmail.com", name: "Test test", username: "test", petOwned: 0},
        {email: "test1@gmail.com", name: "Test test 1", username: "test1", petOwned: 1},
        {email: "test2@gmail.com", name: "Test test 2", username: "test2", petOwned: 2},
        {email: "test3@gmail.com", name: "Test test 3", username: "test3", petOwned: 0},
        {email: "test4@gmail.com", name: "Test test 4", username: "test4", petOwned: 1},
        {email: "test5@gmail.com", name: "Test test 5", username: "test5", petOwned: 2},
    ],
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
                onCancel={toggleDrawer} 
                onSave={handleSave} 
                drawerHeader="Add User"
            >
                <UserForm type="Add" userData={userData} handleFormChange={handleFormChange} />
            </CustomDrawer>
        </React.Fragment>
    );
}

export default UsersPage;