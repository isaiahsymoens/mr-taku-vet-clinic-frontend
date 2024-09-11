import React, {useEffect, useState} from "react";
import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel, {DrawerPanelActions} from "../../components/DrawerPanel";
import VisitForm, {UserList} from "./VisitForm";
import ActionDialog from "../../components/ActionDialog";

import {Visit} from "../../models/visit";
import {User} from "../../models/user";
import {addVisit, AddEditVisitRequest, deleteVisit, fetchVisits, updateVisit} from "../../api/visits";
import {fetchUsers} from "../../api/users";

import {RootState} from "../../redux";
import {visitActions} from "../../redux/features/visit";
import {useLoaderData} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Alert, Box, Snackbar} from "@mui/material";
import {GenericErrorResponse} from "../../utils/errorHelper";

const tableHeaders: DataTableHeaders[] = [
    {label: "Owner", field: "pet.user.name"},
    {label: "Pet", field: "pet.petName"},
    {label: "Visit Type", field: "visitType.typeName"},
    {label: "Visit Date", field: "date"}
];

const initialState: AddEditVisitRequest = {
    owner: "",
    petId: 0,
    visitTypeId: 0, 
    date: null,
    notes: ""
}

type LoaderData = {
    loaderUsers: User[];
    loaderVisits: Visit[];
}

const VisitsPage: React.FC = () => {
    const [visitData, setVisitData] = useState<AddEditVisitRequest>(initialState);
    const [selectedVisit, setSelectedVisit] = useState<Visit>(null!);
    const [userList, setUserList] = useState<UserList[]>([]);
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isActionDialog, setIsActionDialog] = useState(false);
    const [visitDrawerType, setVisitDrawerType] = useState<DrawerPanelActions | string>("");
    const [snackbarMsg, setSnackbarMsg] = useState<string>("");
    const [errors, setErrors] = useState<GenericErrorResponse>({});

    const dispatch = useDispatch();
    const visits = useSelector((state: RootState) => state.visit.visits);

    const {loaderUsers, loaderVisits} = useLoaderData() as LoaderData;

    useEffect(() => {
        if (loaderUsers) {
            setUserList(loaderUsers.filter(u => u.petOwned > 0).map(u => ({
                username: u.username,
                name: `${u.firstName} ${u.middleName} ${u.lastName}`,
            })));
        }
        if (loaderVisits) {
            dispatch(visitActions.setVisits(loaderVisits));
        }
    }, [dispatch]);

    const handleEdit = (data: Visit) => {
        setVisitData({
            ...data, 
            owner: data.pet?.user?.username as string,
            petId: data.pet?.petId as number, 
            visitTypeId: data.visitType?.visitTypeId as number
        });
        setVisitDrawerType(DrawerPanelActions.Edit);
        toggleDrawer();
    }

    const handleView = (data: Visit) => {
        setSelectedVisit(data); 
        setVisitDrawerType(DrawerPanelActions.View);
        toggleDrawer();
    }

    const handleDelete = (data: Visit) => {
        setSelectedVisit(data);
        setVisitDrawerType(DrawerPanelActions.Delete);
        toggleActionDialog();
    }

    const handleFormChange = (key: keyof AddEditVisitRequest, value: any) => {
        setVisitData((prevData) => ({...prevData, [key]: value}));
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const toggleCancelDrawer = () => {
        setIsDrawerOpen(prev => !prev);
        setVisitDrawerType("");
    }

    const toggleActionDialog = () => {
        setIsActionDialog(prev => !prev);
    }

    const handleSaveConfirmDlg = async () => {
        try {
            await deleteVisit(selectedVisit.visitId as number);
            dispatch(visitActions.removeVisit(selectedVisit.visitId));
            setSnackbarMsg("Successfully deleted.");
            setSelectedVisit(null!);
            toggleActionDialog();
        } catch(err) {}
    }

    const handleAddSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await addVisit(visitData as AddEditVisitRequest);
            dispatch(visitActions.addVisit(response));
            setVisitData(initialState);
            toggleDrawer();
        } catch(err) {}
    }

    const handleEditSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await updateVisit(visitData);
            dispatch(visitActions.updateVisit(response));
            setVisitData(initialState);
            toggleDrawer();
        } catch(err) {}
    }

    const handleAdd = () => {
        setVisitDrawerType(DrawerPanelActions.Add);
        toggleDrawer();
    }
    
    return (
        <Box>
            <SubHeader text="Visits" btnText="Add Visit" toggleDrawer={handleAdd} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <DataTable 
                    tableHeaders={tableHeaders} 
                    tableBody={visits}
                    menuActions={(data: Visit) => [
                        {
                            name: "Edit",
                            onClick: () => handleEdit(data),
                        },
                        {
                            name: "View",
                            onClick: () => handleView(data),
                        },
                        {
                            name: "Delete",
                            onClick: () => handleDelete(data),
                        }
                    ]}
                />
            </Box>
            <DrawerPanel 
                open={isDrawerOpen} 
                onCancel={() => {
                    toggleCancelDrawer();
                    setVisitData(initialState);
                    setSelectedVisit(null!);
                }} 
                onSave={visitDrawerType === DrawerPanelActions.Add ? handleAddSave : handleEditSave} 
                drawerHeader={
                    visitDrawerType === DrawerPanelActions.Add ? "Add Visit"
                    :
                    visitDrawerType === DrawerPanelActions.Edit ? "Edit Visit" : "View Visit"
                }
                showBtn={visitDrawerType !== DrawerPanelActions.View}
            >
                <VisitForm 
                    type={visitDrawerType}
                    visitData={visitData}
                    selectedVisitData={selectedVisit}
                    userList={userList}
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
                    sx={{
                        background: "#28A745", 
                        color: "#FFF", "& .MuiAlert-icon": {color: "#FFF"}
                    }}
                    onClose={() => setSnackbarMsg("")}
                >
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default VisitsPage;

export const loader = async () => {
    const loaderUsers = await fetchUsers();
    const loaderVisits = await fetchVisits();
    return {loaderUsers, loaderVisits};
}