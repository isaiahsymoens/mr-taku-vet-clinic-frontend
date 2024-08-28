import { Box } from "@mui/material";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";

const VisitsPage: React.FC = () => {
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

    return (
        <Box>
            <SubHeader text="Visits" btnText="Add Visit" />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomTable tableHeaders={tableData.tableHeaders} tableBody={tableData.tableBody}/>
            </Box>
        </Box>
    );
}

export default VisitsPage;