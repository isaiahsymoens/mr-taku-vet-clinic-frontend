import {useState} from "react";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import VisitForm, { VisitData, VisitTypes } from "./VisitForm";
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
    visitDate: "",
    notes: ""
}

const VisitsPage: React.FC = () => {
    const [visitData, setVisitData] = useState<VisitData>(initialState);
    const [selectedVisit, setSelectedVisit] = useState<VisitData>({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [visitDrawerType, setVisitDrawerType] = useState<VisitTypes | string>("");

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
        console.log("data :", data);
        setSelectedVisit(data);
        setVisitDrawerType(VisitTypes.Edit);
    }

    const handleView = (data: VisitData) => {
        setSelectedVisit(data); 
        setVisitDrawerType(VisitTypes.View);
        toggleDrawer();
    }

    const handleDelete = (data: VisitData) => {
        setSelectedVisit(data);
        setVisitDrawerType(VisitTypes.Delete);
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

    const handleSave = () => {
    }

    return (
        <Box>
            <SubHeader text="Visits" btnText="Add Visit" toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomTable 
                    tableHeaders={tableData.tableHeaders} 
                    tableBody={tableData.tableBody}
                    menuActions={menuActions}
                />
            </Box>
            <CustomDrawer 
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
            </CustomDrawer>
        </Box>
    );
}

export default VisitsPage;