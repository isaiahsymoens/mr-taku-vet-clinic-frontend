import React from "react";
import {
    Paper, 
    TableCell, 
    TableContainer, 
    Table, 
    TableBody, 
    TableHead, 
    TableRow,
} from "@mui/material";
import CustomTableRowMenu from "./CustomTableRowMenu";

export type CustomTableProps = {
    tableHeaders: any[];
    tableBody: any[];
}

const CustomTable: React.FC<CustomTableProps> = ({ tableHeaders, tableBody }) => {
    const onEditRow = (data: any) => {
        console.log("edit :", data);
    }

    const onViewRow = (data: any) => {
        console.log("view :", data);
    }

    const onDeleteRow = (data: any) => {
        console.log("delete :", data);
    }

    return (
        <React.Fragment>
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
                                <CustomTableRowMenu 
                                    onEditRow={onEditRow}
                                    onViewRow={onViewRow}
                                    onDeleteRow={onDeleteRow}
                                    test={tBody}
                                />
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default CustomTable;