import React from "react";
import DataTableRowMenu from "./DataTableRowMenu";
import {Paper, TableCell, TableContainer, Table, TableBody, TableHead, TableRow} from "@mui/material";

export type DataTableHeaders = {
    label: string;
    field: string;
}

export type DataTableProps = {
    tableHeaders?: DataTableHeaders[];
    tableBody: any[];
    menuActions: any;
}

const DataTable: React.FC<DataTableProps> = ({tableHeaders, tableBody, menuActions}) => {
    return (
        <React.Fragment>
            <TableContainer component={Paper} sx={{ width: "100%", height: "100%", overflow: "auto" }}>
                <Table stickyHeader>
                    {tableHeaders &&
                        <TableHead>
                            <TableRow>
                                {tableHeaders?.map((tblHeader, index) => <TableCell key={index} sx={{fontWeight: 600}}>{tblHeader.label}</TableCell>)}
                                {menuActions && <TableCell sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)", width: "50px" }} />}
                            </TableRow>
                        </TableHead>
                    }
                    <TableBody>
                        {tableBody.map((tBody, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {tableHeaders?.map((tHeader: any, colIndex) => (
                                    <TableCell key={colIndex}>
                                    {tBody[tHeader.field]}
                                    </TableCell>
                                ))}
                                {menuActions && 
                                    <TableCell>
                                        <DataTableRowMenu 
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

export default DataTable;