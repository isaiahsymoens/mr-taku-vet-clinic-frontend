import React, {useEffect, useState} from "react";

import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import UserForm, {UserData, UserTypes} from "./UserForm";

import {RootState} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {AddUser, addUser, fetchUsers} from "../../api/users";

import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

type TableHeaders = {
    label: string;
    field: string;
}

const tableHeaders: TableHeaders[] = [
    {label: "Name", field: "name"},
    {label: "Email", field: "email"},
    {label: "Pet Owned", field: "petOwned"},
];

const initialStateUserData: AddUser = {
    firstName: "", 
    middleName: "", 
    lastName: "", 
    email: "", 
    username: "",
    password: "",
    userTypeId: 0,
    active: false,
}

const UsersPage: React.FC = () => {
    const [userData, setUserData] = useState<AddUser>(initialStateUserData);
    const [selectedUser, setSelectedUser] = useState<UserData>(null!);
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmationDialog, setIsConfirmationDialog] = useState(false);

    const users = useSelector((state: RootState) => state.user.users);

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

    const handleAddUser = () => {
        const response = addUser(userData)
    }

    const handleEditUser = () => {
        console.log("Edit User!");
    }

    return (
        <React.Fragment>
            <SubHeader text="Users" showSearchbar={true} btnText="Add User" toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomTable 
                    tableHeaders={tableHeaders} 
                    tableBody={users} 
                    menuActions={menuActions} 
                />
            </Box>
            <CustomDrawer 
                open={isDrawerOpen} 
                onCancel={toggleDrawer} 
                onSave={selectedUser ? handleEditUser : handleAddUser} 
                drawerHeader={selectedUser ? "Add User" : "Edit User"}
            >
                <UserForm 
                    type={selectedUser == null ? UserTypes.Add : UserTypes.Edit} 
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