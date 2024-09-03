import React from "react";
import CustomTableRowMenu from "./CustomTableRowMenu";
import {Paper, TableCell, TableContainer, Table, TableBody, TableHead, TableRow} from "@mui/material";

export type CustomTableProps = {
    tableHeaders: any[];
    tableBody: any[];
    menuActions: any;
}

const CustomTable: React.FC<CustomTableProps> = ({tableHeaders, tableBody, menuActions}) => {
    return (
        <React.Fragment>
            <TableContainer component={Paper} sx={{ width: "100%", height: "100%", overflow: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {tableHeaders.map((tblHeader, index) => <TableCell key={index}>{tblHeader.label}</TableCell>)}
                            {menuActions && <TableCell sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)", width: "50px" }} />}
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
                                {menuActions && 
                                    <TableCell>
                                        <CustomTableRowMenu 
                                            menu={menuActions}
                                            data={tBody}
                                        />
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default CustomTable;