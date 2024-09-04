import React, {useEffect, useState} from "react";

import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel, {DrawerPanelActions} from "../../components/DrawerPanel";
import ActionDialog from "../../components/ActionDialog";
import UserForm, {UserData} from "./UserForm";

import {userActions} from "../../redux/features/user";
import {RootState} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {AddUser, addUser, deleteUser, fetchUsers} from "../../api/users";
import {User} from "../../models/user";

import {Box} from "@mui/material";
import {useLoaderData, useNavigate} from "react-router-dom";

const tableHeaders: DataTableHeaders[] = [
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
    active: true
}

const UsersPage: React.FC = () => {
    const [userData, setUserData] = useState<AddUser>(initialStateUserData);
    const [selectedUser, setSelectedUser] = useState<UserData>(null!);
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isActionDialog, setIsActionDialog] = useState(false);

    const loaderData = useLoaderData() as User;
    const users = useSelector((state: RootState) => state.user.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("loaderData :", loaderData);
        if (loaderData) {
            dispatch(userActions.setUsers(loaderData));
        }
    }, [dispatch]);

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
        toggleActionDialog();
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const toggleActionDialog = () => {
        setIsActionDialog(prev => !prev);
    }

    const handleSaveConfirmDlg = async () => {
        try {
            await deleteUser(selectedUser.username as string);
            dispatch(userActions.removeUser(selectedUser.username as string));
            setSelectedUser(null!);
            toggleActionDialog();
        } catch (err) {
            // TODO: handle error message
        }
    }

    const handleFormChange = (key: keyof UserData, value: any) => {
        if (key === "email") {
            setUserData((prevData) => ({...prevData, [key]: value}));
            setUserData((prevData) => ({...prevData, username: value.split("@")[0]}));    
        } else {
            setUserData((prevData) => ({...prevData, [key]: value}));
        }
    }

    const handleAddUser = async () => {
        try {
            const response = await addUser(userData);
            dispatch(userActions.addUser(response.data));
            setUserData(initialStateUserData);
            toggleDrawer();
        } catch (err) {}
    }

    const handleEditUser = () => {
        console.log("Edit User!");
    }

    return (
        <React.Fragment>
            <SubHeader text="Users" showSearchbar={true} btnText="Add User" toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <DataTable 
                    tableHeaders={tableHeaders} 
                    tableBody={users} 
                    menuActions={(user: User) => [
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
                    ]} 
                />
            </Box>
            <DrawerPanel 
                open={isDrawerOpen} 
                onCancel={() => {
                    toggleDrawer();
                    setSelectedUser(null!);
                }} 
                onSave={selectedUser ? handleEditUser : handleAddUser} 
                drawerHeader={selectedUser ? "Edit User" : "Add User"}
            >
                <UserForm 
                    type={selectedUser == null ? DrawerPanelActions.Add : DrawerPanelActions.Edit} 
                    userData={selectedUser == null ? userData : selectedUser} 
                    handleFormChange={handleFormChange} 
                />
            </DrawerPanel>
            <ActionDialog
                title="Are you sure you want to delete this user record?"
                description="This will delete permanently, You cannot undo this action."
                isOpen={isActionDialog}
                onSave={handleSaveConfirmDlg}
                onCancel={toggleActionDialog}
            />
        </React.Fragment>
    );
}

export default UsersPage;

export const loader = async () => {
    return await fetchUsers();
}