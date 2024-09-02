import React, {useEffect, useState} from "react";

import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import UserForm, {UserData} from "./UserForm";

import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { fetchUsers } from "../../api/users";

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

type TableHeaders = {
    label: string;
    field: string;
}

const tableHeaders: TableHeaders[] = [
    {label: "Name", field: "name"},
    {label: "Email", field: "email"},
    {label: "Pet Owned", field: "petOwned"},
]

const initialStateUserData: UserData = {
    firstName: "", 
    middleName: "", 
    lastName: "", 
    email: "", 
    petOwned: 0, 
    username: "",
    password: "",
    userType: "",
    active: false,
}

const UsersPage: React.FC = () => {
    const [userData, setUserData] = useState<UserData>(initialStateUserData);
    const [selectedUser, setSelectedUser] = useState<UserData>({});
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmationDialog, setIsConfirmationDialog] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchUsers();
        }

        loadData();
    }, []);

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
                    tableHeaders={tableHeaders} 
                    tableBody={tableData.tableBody} 
                    menuActions={menuActions} 
                />
            </Box>
            <CustomDrawer 
                open={isDrawerOpen} 
                onCancel={toggleDrawer} 
                onSave={handleSave} 
                drawerHeader={selectedUser ? "Add User" : "Edit User"}
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