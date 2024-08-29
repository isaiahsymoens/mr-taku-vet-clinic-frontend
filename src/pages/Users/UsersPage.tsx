import React, {useState} from "react";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import {Box} from "@mui/material";
import UserForm, {UserData} from "./UserForm";
import {useNavigate} from "react-router-dom";
import ConfirmationDialog from "../../components/ConfirmationDialog";

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
    const [isConfirmDlgOpen, setIsConfirmDlgOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>(initialState);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const handleFormChange = (key: keyof UserData, value: any) => {
        setUserData((prevData) => ({...prevData, [key]: value}));
    }

    const handleSave = () => {
    }

    const handleEdit = (data: any) => {
        
    }

    const handleView = (data: any) => {
        navigate(`/${data.username}`);
    }

    const handleDelete = (data: any) => {

    }

    const menu = (user: any) => [
        {
            name: "Edit",
            onClick: () => handleEdit(user),
        },
        {
            name: "View",
            onClick: () => handleView(user),
        },
        {
            name: "Delete",
            onClick: () => handleDelete(user),
        }
    ];
    
    return (
        <React.Fragment>
            <SubHeader text="Users" showSearchbar={true} btnText="Add User" toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomTable 
                    tableHeaders={tableData.tableHeaders} 
                    tableBody={tableData.tableBody} 
                    menu={menu} 
                />
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