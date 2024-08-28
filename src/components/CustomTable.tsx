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
        <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto" }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((tblHeader, index) => <TableCell key={index}>{tblHeader.label}</TableCell>)}
                        <TableCell sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)", width: "50px" }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableBody.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                        {tableHeaders.map((column: any, colIndex) => (
                            <TableCell key={colIndex}>
                            {row[column.field]}
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