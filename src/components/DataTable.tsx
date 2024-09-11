import React from "react";
import dayjs from "dayjs";
import DataTableRowMenu from "./DataTableRowMenu";
import {
    Box, 
    Paper, 
    TableCell, 
    TableContainer, 
    Table, 
    TableBody, 
    TableHead, 
    TableRow, 
    Typography, 
    TablePagination
} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import CircleIcon from '@mui/icons-material/Circle';

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
    const getNestedValue = (obj: any, path: string) => {
        return path.split(".").reduce((value, key) => value && value[key], obj);
    }

    const renderCellValue = (value: any) => {
        if (dayjs.isDayjs(value)) {
            return value.format("MMMM D, YYYY");
        }
        return value;
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper} sx={{width: "100%", height: "100vh", maxHeight: "65vh", overflow: "auto"}}>
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
                                {tableHeaders?.map((tHeader: any, colIndex) => {
                                    if (tHeader.field === "petName") {
                                        return <TableCell key={colIndex} sx={{display: "flex", alignItems: "center"}}>
                                            <PetsIcon 
                                                sx={{ 
                                                    color: "#FFF",
                                                    background: "#AAA",
                                                    borderRadius: "5em",
                                                    p: .5, 
                                                    mr: 1
                                                }}
                                            />
                                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                                {renderCellValue(getNestedValue(tBody, tHeader.field))}
                                                <Box sx={{display: "flex"}}>
                                                    <Typography sx={{color: "gray", fontSize: ".8rem"}}>
                                                        {renderCellValue(getNestedValue(tBody, "petType.typeName"))} 
                                                    </Typography>
                                                    {tBody.breed !== "" && 
                                                        <Typography sx={{color: "gray", fontSize: ".8rem"}}>
                                                            <span style={{padding: "0px 5px"}}>•</span>
                                                            {`${renderCellValue(getNestedValue(tBody, "breed"))}`}
                                                        </Typography>
                                                    }
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    } else {
                                        return <TableCell key={colIndex}>
                                            {tHeader.field === "active" ? 
                                                <CircleIcon 
                                                    sx={{
                                                        fontSize: "1em", 
                                                        color: renderCellValue(getNestedValue(tBody, tHeader.field)) ? "#28A745" : "#D3D3D3"
                                                    }} 
                                                />
                                                :
                                                renderCellValue(getNestedValue(tBody, tHeader.field))
                                            }
                                            
                                        </TableCell>
                                    }
                                })}
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
            <TablePagination 
                component="div"
                count={tableBody.length}
                page={0}
                onPageChange={() => {}}
                rowsPerPage={0}
                onRowsPerPageChange={() => {}}
            />
        </React.Fragment>
    );
}

export default DataTable;