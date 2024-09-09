import React, {useEffect, useState} from "react";

import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel, {DrawerPanelActions} from "../../components/DrawerPanel";
import ActionDialog from "../../components/ActionDialog";
import UserForm from "./UserForm";

import {userActions} from "../../redux/features/user";
import {RootState} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {AddEditUserRequest, addUser, deleteUser, fetchUsers, updateUser} from "../../api/users";
import {User} from "../../models/user";

import {Box} from "@mui/material";
import {useLoaderData, useNavigate} from "react-router-dom";

const tableHeaders: DataTableHeaders[] = [
    {label: "Name", field: "name"},
    {label: "Email", field: "email"},
    {label: "Pet Owned", field: "petOwned"},
];

const initialStateUserData: AddEditUserRequest = {
    name: "",
    firstName: "", 
    middleName: "", 
    lastName: "", 
    email: "", 
    username: "", 
    password: "", 
    active: true
}

const UsersPage: React.FC = () => {
    const [userData, setUserData] = useState<AddEditUserRequest>(initialStateUserData);
    const [orgUserData, setOrgUserData] = useState<AddEditUserRequest>(initialStateUserData);
    const [selectedUser, setSelectedUser] = useState<AddEditUserRequest>(null!);
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isActionDialog, setIsActionDialog] = useState(false);

    const [userDrawerType, setUserDrawerType] = useState<DrawerPanelActions | string>("");

    const loaderData = useLoaderData() as User;
    const users = useSelector((state: RootState) => state.user.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (loaderData) {
            dispatch(userActions.setUsers(loaderData));
        }
    }, [dispatch]);

    const handleEdit = (data: User) => {
        setOrgUserData(data);
        setUserData(data);
        setUserDrawerType(DrawerPanelActions.Edit);
        toggleDrawer();
    }

    const handleView = (data: User) => {
        setSelectedUser(data);
        setUserDrawerType(DrawerPanelActions.View);
        navigate(`/${data.username}`);
    }

    const handleDelete = (data: User) => {
        setSelectedUser(data);
        setUserDrawerType(DrawerPanelActions.Delete);
        toggleActionDialog();
    }

    const handleAdd = () => {
        setUserDrawerType(DrawerPanelActions.Add);
        toggleDrawer();
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
        } catch (err) {}
    }

    const handleFormChange = (key: keyof AddEditUserRequest, value: any) => {
        if (key === "email") {
            setUserData((prevData) => ({...prevData, [key]: value}));
            setUserData((prevData) => ({...prevData, username: value.split("@")[0]}));    
        } else {
            setUserData((prevData) => ({...prevData, [key]: value}));
        }
    }

    const handleSaveAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await addUser(userData);
            dispatch(userActions.addUser(response));
            setUserData(initialStateUserData);
            toggleDrawer();
        } catch (err) {
            console.log("test :", err);
        }
    }

    const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let changedData: any = {};
            (Object.keys(userData) as (keyof AddEditUserRequest)[]).forEach(key => {
                if (orgUserData[key] !== userData[key]) {
                    changedData[key] = userData[key];
                }
            });
            const response = await updateUser(userData.username, changedData);
            dispatch(userActions.updateUser(response));
            toggleDrawer();
        } catch(err) {}
    }

    return (
        <React.Fragment>
            <SubHeader text="Users" showSearchbar={true} btnText="Add User" toggleDrawer={handleAdd} />
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
                    setUserDrawerType("");
                    setUserData(initialStateUserData);
                    setSelectedUser(null!);
                }} 
                onSave={userDrawerType === DrawerPanelActions.Add ? handleSaveAdd : handleEditUser} 
                drawerHeader={userDrawerType === DrawerPanelActions.Add ? "Add User" : "Edit User"}
            >
                <UserForm 
                    type={userDrawerType} 
                    userData={userData} 
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