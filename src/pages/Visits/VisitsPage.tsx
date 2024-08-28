import {useState, useEffect} from "react";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import {Box, TextField} from "@mui/material";
import CustomDrawer from "../../components/CustomDrawer";

const tableData = {
    tableHeaders: [
        {label: "Owner", field: "owner"},
        {label: "Pet", field: "pet"},
        {label: "VisitType", field: "visitType"},
        {label: "VisitDate", field: "visitDate"}
        
    ],
    tableBody: [
        {owner: "Saitama Sy", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
        {owner: "Saitama Sy", pet: "Doge", visitType: "Consultation", visitDate: "08-28-2024"},
    ]
}

interface VisitData {
    owner: string;
    pet: string;
    visitType: string;
    visitDate: string;
    notes: string;
}

const initialState: VisitData = {
    owner: "",
    pet: "",
    visitType: "",
    visitDate: "",
    notes: "" 
}

const VisitsPage: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [visitData, setVisitData] = useState<VisitData>(initialState);

    useEffect(() => {
        // TODO: use api
        // setVisitDate();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const handleSave = () => {
    }

    return (
        <Box>
            <SubHeader text="Visits" btnText="Add Visit" toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomTable tableHeaders={tableData.tableHeaders} tableBody={tableData.tableBody}/>
            </Box>
            <CustomDrawer 
                open={isDrawerOpen} 
                onClose={toggleDrawer} 
                onCancel={toggleDrawer} 
                onSave={handleSave} 
                drawerHeader="Add Visit"
            >
                <TextField 
                    label="Owner" 
                    variant="outlined" 
                    value={visitData.owner} 
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Pet" 
                    variant="outlined" 
                    value={visitData.pet} 
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Visit Type" 
                    variant="outlined" 
                    value={visitData.visitType} 
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Visit Date" 
                    variant="outlined" 
                    value={visitData.visitDate} 
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Notes"
                    variant="outlined" 
                    value={visitData.notes} 
                    size="small" 
                    multiline
                    rows={4}
                    fullWidth 
                />
            </CustomDrawer>
        </Box>
    );
}

export default VisitsPage;