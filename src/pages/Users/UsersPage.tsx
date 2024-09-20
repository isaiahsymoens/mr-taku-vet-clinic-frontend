import React, {useEffect, useState} from "react";

import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel, {DrawerPanelActions} from "../../components/DrawerPanel";
import ActionDialog from "../../components/ActionDialog";
import UserForm from "./UserForm";

import {userActions} from "../../redux/features/user";
import {RootState} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {AddEditUserRequest, addUser, deleteUser, fetchUsers, getUserPasswordByUsername, searchUsersByName, updateUser} from "../../api/users";
import {User} from "../../models/user";

import {Alert, Box, Snackbar} from "@mui/material";
import {useLoaderData, useNavigate} from "react-router-dom";
import {GenericErrorResponse} from "../../utils/errorHelper";
import {PaginatedResponse} from "../../models/paginatedResponse";

const tableHeaders: DataTableHeaders[] = [
    {label: "Name", field: "name"},
    {label: "Email", field: "email"},
    {label: "Pet Owned", field: "petOwned"},
    {label: "Active", field: "active"}
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
    const [snackbarMsg, setSnackbarMsg] = useState<string>("");
    const [errors, setErrors] = useState<GenericErrorResponse>({});

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [searchInput, setSearchInput] = useState("");

    const loaderData = useLoaderData() as PaginatedResponse<User>;
    const users = useSelector((state: RootState) => state.user.users);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (loaderData) {
            dispatch(userActions.setUsers(loaderData.data));
            setTotalCount(loaderData.totalItems);
        }
    }, [dispatch]);

    const handleEdit = async (data: User) => {
        const response = await getUserPasswordByUsername(data.username);
        const dataWithPassword: any = {...data, password: response};
        setOrgUserData(dataWithPassword);
        setUserData(dataWithPassword);
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
            setSnackbarMsg("Successfully deleted.");
            const response = await fetchUsers(page);
            dispatch(userActions.setUsers(response.data));
            setTotalCount(response.totalItems);
            setSelectedUser(null!);
            toggleActionDialog();
        } catch (err) {}
    }

    const handleFormChange = (key: keyof AddEditUserRequest, value: any) => {
        setUserData((prevData) => ({...prevData, [key]: value}));
    }

    const handleSaveAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setErrors({});
            const response = await addUser(userData);
            dispatch(userActions.addUser(response));
            setTotalCount(totalCount + 1);
            setUserData(initialStateUserData);
            toggleDrawer();
            reset();
        } catch (err) {
            setErrors(err as GenericErrorResponse);
        }
    }

    const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setErrors({});
            let changedData: any = {};
            (Object.keys(userData) as (keyof AddEditUserRequest)[]).forEach(key => {
                if (orgUserData[key] !== userData[key]) {
                    changedData[key] = userData[key];
                }
            });
            const response = await updateUser(orgUserData.username, changedData);
            dispatch(userActions.updateUser(response));
            toggleDrawer();
            reset();
        } catch(err) {
            setErrors(err as GenericErrorResponse);
        }
    }

    const reset = () => {
        setUserDrawerType("");
        setUserData(initialStateUserData);
        setSelectedUser(null!);
        setErrors({});
    }

    const handleSearch = async (input: string) => {
        const response = await searchUsersByName(input);
        dispatch(userActions.setUsers(response.data));
        setTotalCount(response.totalItems);
        setSearchInput(input);
    }

    const handlePageChange = async (newPage: number) => {
        setPage(newPage);
        const response = await fetchUsers(newPage);
        dispatch(userActions.setUsers(response.data));
        setTotalCount(response.totalItems);
    }

    const handleSort = async (currentPage: number, headerColumn: string, isAsc: boolean) => {
        let response;
        if (searchInput !== "") {
            response = await searchUsersByName(searchInput, headerColumn, isAsc);
        } else {
            response = await fetchUsers(currentPage, headerColumn, isAsc);
        }
        dispatch(userActions.setUsers(response.data));
        setTotalCount(response.totalItems);
    }

    return (
        <React.Fragment>
            <SubHeader 
                text="Users" 
                showSearchbar={true} 
                btnText="Add User" 
                toggleDrawer={handleAdd} 
                onSearch={handleSearch} 
            />
            <Box sx={{flexGrow: 1, p: 3}}>
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
                    onSort={handleSort}
                    page={page}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                />
            </Box>
            <DrawerPanel 
                open={isDrawerOpen} 
                onCancel={() => {
                    toggleDrawer();
                    reset();
                }} 
                onSave={userDrawerType === DrawerPanelActions.Add ? handleSaveAdd : handleEditUser} 
                drawerHeader={userDrawerType === DrawerPanelActions.Add ? "Add User" : "Edit User"}
            >
                <UserForm 
                    type={userDrawerType} 
                    userData={userData} 
                    handleFormChange={handleFormChange}
                    errors={errors}
                />
            </DrawerPanel>
            <ActionDialog
                title="Are you sure you want to delete this user record?"
                description="This will delete permanently, You cannot undo this action."
                isOpen={isActionDialog}
                onSave={handleSaveConfirmDlg}
                onCancel={toggleActionDialog}
            />
            <Snackbar 
                open={snackbarMsg !== ""} 
                autoHideDuration={3000} 
                onClose={() => setSnackbarMsg("")}
            >
                <Alert
                    severity="success"
                    onClose={() => setSnackbarMsg("")}
                >
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default UsersPage;

export const loader = async () => {
    return await fetchUsers();
}