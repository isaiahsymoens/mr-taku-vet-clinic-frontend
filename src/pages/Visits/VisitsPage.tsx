import React, {useEffect, useState} from "react";
import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel, { DrawerPanelActions } from "../../components/DrawerPanel";
import VisitForm, {UserList} from "./VisitForm";
import ActionDialog from "../../components/ActionDialog";

import {Visit} from "../../models/visit";
import {addVisit, AddVisitRequest, fetchVisits} from "../../api/visits";

import {useLoaderData} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {visitActions} from "../../redux/features/visit";
import {RootState} from "../../redux";

import {Box} from "@mui/material";
import { fetchUsers } from "../../api/users";
import { User } from "../../models/user";

const tableHeaders: DataTableHeaders[] = [
    {label: "Owner", field: "pet.user.name"},
    {label: "Pet", field: "pet.petName"},
    {label: "Visit Type", field: "visitType"},
    {label: "Visit Date", field: "date"}
];

const initialState: AddVisitRequest = {
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
    const [visitData, setVisitData] = useState<AddVisitRequest>(initialState);
    const [selectedVisit, setSelectedVisit] = useState<Visit>(null!);
    const [userList, setUserList] = useState<UserList[]>([]);
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isActionDialog, setIsActionDialog] = useState(false);
    const [visitDrawerType, setVisitDrawerType] = useState<DrawerPanelActions | string>("");
    
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
        setSelectedVisit(data);
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

    const handleFormChange = (key: keyof AddVisitRequest, value: any) => {
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

    const handleSaveConfirmDlg = () => {
        console.log("selectedVisit :", selectedVisit);
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await addVisit(visitData);
        dispatch(visitActions.addVisit(response));
        setVisitData(initialState);
        toggleDrawer();
    }

    return (
        <Box>
            <SubHeader text="Visits" btnText="Add Visit" toggleDrawer={toggleDrawer} />
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
                    setSelectedVisit(null!);
                }} 
                onSave={handleSave} 
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
                />
            </DrawerPanel>
            <ActionDialog
                title="Are you sure you want to delete this user record?"
                description="This will delete permanently, You cannot undo this action."
                isOpen={isActionDialog}
                onSave={handleSaveConfirmDlg}
                onCancel={toggleActionDialog}
            />
        </Box>
    );
}

export default VisitsPage;

export const loader = async () => {
    const loaderUsers = await fetchUsers();
    const loaderVisits = await fetchVisits();
    return {loaderUsers, loaderVisits};
}