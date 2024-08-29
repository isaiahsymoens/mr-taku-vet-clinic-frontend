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

const initialStateUserData: UserData = {
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
    const [userData, setUserData] = useState<UserData>(initialStateUserData);
    const [selectedUser, setSelectedUser] = useState({});
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmationDialog, setIsConfirmationDialog] = useState(false);

    const navigate = useNavigate();

    const menuActions = (user: any) => [
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

    const handleEdit = (data: any) => {
        console.log("data :", data);
        setSelectedUser(data);
        toggleDrawer();
    }

    const handleView = (data: any) => {
        setSelectedUser(data);
        navigate(`/${data.username}`);
    }

    const handleDelete = (data: any) => {
        setSelectedUser(data);
        toggleConfirmationDialog();
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const toggleConfirmationDialog = () => {
        setIsConfirmationDialog(prev => !prev);
    }

    const handleSaveConfirmDlg = () => {
        console.log("username :", selectedUser?.username);
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
                <CustomTable 
                    tableHeaders={tableData.tableHeaders} 
                    tableBody={tableData.tableBody} 
                    menuActions={menuActions} 
                />
            </Box>
            <CustomDrawer 
                open={isDrawerOpen} 
                onCancel={toggleDrawer} 
                onSave={handleSave} 
                drawerHeader="Add User"
            >
                <UserForm 
                    type={selectedUser == null ? "Add" : "Edit"} 
                    userData={selectedUser == null ? userData : selectedUser} 
                    handleFormChange={handleFormChange} 
                />
            </CustomDrawer>
            <ConfirmationDialog
                title="Are you sure you want to delete this user record?"
                description="This will delete permanently, You cannot undo this action."
                isOpen={isConfirmationDialog}
                onSave={handleSaveConfirmDlg}
                onCancel={toggleConfirmationDialog}
            />
        </React.Fragment>
    );
}

export default UsersPage;