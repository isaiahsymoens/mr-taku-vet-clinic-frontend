import {
    Paper, 
    TableCell, 
    TableContainer, 
    Table, 
    TableBody, 
    TableHead, 
    TableRow,
    IconButton,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export type CustomTableProps = {
    tableHeaders: any[];
    tableBody: any[];
}

const CustomTable: React.FC<CustomTableProps> = ({ tableHeaders, tableBody }) => {
    return (
        <TableContainer component={Paper} sx={{ width: "100%", height: "100%", overflow: "auto" }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((tblHeader, index) => <TableCell key={index}>{tblHeader.label}</TableCell>)}
                        <TableCell sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)", width: "50px" }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableBody.map((tBody, rowIndex) => (
                        <TableRow key={rowIndex}>
                        {tableHeaders.map((tHeader: any, colIndex) => (
                            <TableCell key={colIndex}>
                            {tBody[tHeader.field]}
                            </TableCell>
                        ))}
                        <TableCell>
                            <IconButton aria-label="delete" size="small">
                            <MoreVertIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;