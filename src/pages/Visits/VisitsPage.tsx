import React, {useEffect, useState} from "react";
import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel from "../../components/DrawerPanel";
import VisitForm, {UserList, VisitData, VisitTypes} from "./VisitForm";
import ActionDialog from "../../components/ActionDialog";

import {Visit} from "../../models/visit";
import {addVisit, fetchVisits} from "../../api/visits";

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

const initialState: VisitData = {
    petName: "",
    visitTypeId: 0, 
    date: null,
    notes: ""
}

type LoaderData = {
    loaderUsers: User[];
    loaderVisits: Visit[];
}



const VisitsPage: React.FC = () => {
    const [visitData, setVisitData] = useState<VisitData>(initialState);
    const [selectedVisit, setSelectedVisit] = useState<VisitData>(null!);
    const [visitDrawerType, setVisitDrawerType] = useState<VisitTypes | string>("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isActionDialog, setIsActionDialog] = useState(false);

    const [userList, setUserList] = useState<UserList[]>([]);

    const visits = useSelector((state: RootState) => state.visit.visits);
    const dispatch = useDispatch();
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

    const handleEdit = (data: VisitData) => {
        setSelectedVisit(data);
        setVisitDrawerType(VisitTypes.Edit);
        toggleDrawer();
    }

    const handleView = (data: VisitData) => {
        setSelectedVisit(data); 
        setVisitDrawerType(VisitTypes.View);
        toggleDrawer();
    }

    const handleDelete = (data: VisitData) => {
        setSelectedVisit(data);
        setVisitDrawerType(VisitTypes.Delete);
        toggleActionDialog();
    }

    const handleFormChange = (key: keyof VisitData, value: any) => {
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
        console.log("visitData :", visitData);
        // const response = await addVisit(visitData);
    }

    return (
        <Box>
            <SubHeader text="Visits" btnText="Add Visit" toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <DataTable 
                    tableHeaders={tableHeaders} 
                    tableBody={visits}
                    menuActions={(data: VisitData) => [
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
                onCancel={toggleCancelDrawer} 
                onSave={handleSave} 
                drawerHeader="Add Visit"
                showBtn={visitDrawerType !== VisitTypes.View}
            >
                <VisitForm 
                    type={visitDrawerType}
                    visitData={visitData}
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