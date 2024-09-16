import React, {useState} from "react";
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
    TablePagination,
    TableSortLabel
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
    page: number;
    totalCount: number;
    onPageChange: (newPage: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({tableHeaders, tableBody, menuActions, page, totalCount, onPageChange}) => {
    const [sortConfig, setSortConfig] = useState<{field: string, direction: "asc"|"desc"} | null>(null);

    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onPageChange(newPage + 1);
    }
    
    const sortTableData = (data: any[]) => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            const aValue = getNestedValue(a, sortConfig.field);
            const bValue = getNestedValue(b, sortConfig.field);

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue, undefined, {sensitivity: "case"})
                    : bValue.localeCompare(aValue, undefined, {sensitivity: "case"})
            }

            if (aValue < bValue) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            
            return 0;
        });
    }

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
                                {tableHeaders?.map((tblHeader, index) => 
                                    <TableCell key={index} sx={{fontWeight: 600}}>
                                        <TableSortLabel
                                            active={sortConfig?.field === tblHeader.field}
                                            direction={sortConfig?.direction === "asc" ? "asc" : "desc"}
                                            onClick={() => {
                                              const isAsc = sortConfig?.field === tblHeader.field && sortConfig?.direction === "asc";
                                              setSortConfig({field: tblHeader.field, direction: isAsc ? "desc" : "asc"});  
                                            }}
                                        >
                                            {tblHeader.label}
                                        </TableSortLabel>
                                    </TableCell>
                                )}
                                {menuActions && <TableCell sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)", width: "50px" }} />}
                            </TableRow>
                        </TableHead>
                    }
                    <TableBody>
                        {sortTableData(tableBody).slice(0, 10).map((tBody, rowIndex) => (
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
                count={totalCount}
                page={page - 1}
                onPageChange={handlePageChange}
                rowsPerPage={10}
                rowsPerPageOptions={[]}
                // onRowsPerPageChange={() => {}}
            />
        </React.Fragment>
    );
}

export default DataTable;