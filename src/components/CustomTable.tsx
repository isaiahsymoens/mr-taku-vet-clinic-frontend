import {
    Paper, 
    TableCell, 
    TableContainer, 
    Table, 
    TableBody, 
    TableHead, 
    TableRow,
    IconButton,
    Box
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const tableData = {
    tableHeaders: [
        {label: "Name", field: "name"},
        {label: "Email", field: "email"},
        {label: "Pet Owned", field: "petOwned"},
        {label: "", field: ""}
    ],
    tableRows: [
        {email: "test@gmail.com", name: "Test test", petOwned: 0},
        {email: "test1@gmail.com", name: "Test test 1", petOwned: 1},
        {email: "test2@gmail.com", name: "Test test 2", petOwned: 2},
    ],
}

const CustomTable: React.FC = () => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableData.tableHeaders.map((tblHeader, index) => <TableCell key={index}>{tblHeader.label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.tableHeaders.map((e, index) => 
                        <TableRow key={index}>
                            {/* {tableData.tableRows.map((tblRow, index) => )} */}
                        </TableRow>
                    )}
                    {/* <TableRow>
                        {tableData.tableRows.map((e, index) =>
                            <TableCell key={index}>
                                {}
                            </TableCell>
                        )}
                        <TableCell>
                            <IconButton size="small">
                                <MoreVertIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;