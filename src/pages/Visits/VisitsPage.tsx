import {useState} from "react";
import SubHeader from "../../components/SubHeader";
import DataTable from "../../components/DataTable";
import DrawerPanel from "../../components/DrawerPanel";
import VisitForm, { VisitData, VisitTypes } from "./VisitForm";
import ActionDialog from "../../components/ActionDialog";

import {fetchVisits} from "../../api/visits";
import {Box} from "@mui/material";

const tableData = {
    tableHeaders: [
        {label: "Owner", field: "owner"},
        {label: "Pet", field: "pet"},
        {label: "VisitType", field: "visitType"},
        {label: "VisitDate", field: "visitDate"}
        
    ],
    tableBody: [
        {owner: "Saitama Sy 1", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy 2", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy 3", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy 4", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy 5", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy 6", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
    ]
}

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

    const menuActions = (data: VisitData) => [
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
    ];

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

    const handleSave = () => {
    }

    return (
        <Box>
            <SubHeader text="Visits" btnText="Add Visit" toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <DataTable 
                    tableHeaders={tableData.tableHeaders} 
                    tableBody={tableData.tableBody}
                    menuActions={menuActions}
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
    const response = await fetchVisits();
    return response;
}