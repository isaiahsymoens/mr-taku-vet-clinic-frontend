import React, {useEffect, useState} from "react";
import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel from "../../components/DrawerPanel";
import VisitForm, {VisitData, VisitTypes} from "./VisitForm";
import ActionDialog from "../../components/ActionDialog";

import {Visit} from "../../models/visit";
import {addVisit, fetchVisits} from "../../api/visits";

import {useLoaderData} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {visitActions} from "../../redux/features/visit";
import {RootState} from "../../redux";

import {Box} from "@mui/material";

const tableHeaders: DataTableHeaders[] = [
    {label: "Owner", field: "petDetails.userDetails.name"},
    {label: "Pet", field: "petDetails.petName"},
    {label: "Visit Type", field: "visitType"},
    {label: "Visit Date", field: "date"}
];

const initialState: VisitData = {
    owner: "",
    pet: "",
    visitType: "",
    date: null,
    notes: ""
}

const VisitsPage: React.FC = () => {
    const [visitData, setVisitData] = useState<VisitData>(initialState);
    const [selectedVisit, setSelectedVisit] = useState<VisitData>({});
    const [visitDrawerType, setVisitDrawerType] = useState<VisitTypes | string>("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isActionDialog, setIsActionDialog] = useState(false);

    const visits = useSelector((state: RootState) => state.visit.visits);
    const dispatch = useDispatch();
    const loaderData = useLoaderData() as Visit;

    useEffect(() => {
        if (loaderData) {
            dispatch(visitActions.setVisits(loaderData));
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
    return await fetchVisits();
}