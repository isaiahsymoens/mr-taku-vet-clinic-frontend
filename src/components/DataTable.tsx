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
    TableSortLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField
} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import CircleIcon from '@mui/icons-material/Circle';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

export type DataTableHeaders = {
    label: string;
    field: string;
}

export type DataTableProps = {
    tableHeaders?: DataTableHeaders[];
    tableBody: any[];
    noHeader?: boolean;
    menuActions?: any;
    page: number;
    totalCount: number;
    onPageChange: (newPage: number) => void;
    smallTable?: boolean;
    onSort: (currentPage: number, tableHeader: string, isAsc: boolean) => void;
}

const DataTable: React.FC<DataTableProps> = ({tableHeaders, tableBody, noHeader=false, menuActions, page, totalCount, onPageChange, smallTable=false, onSort}) => {
    const [sortConfig, setSortConfig] = useState<{field: string, direction: "asc"|"desc"} | null>({
        field: tableHeaders ? tableHeaders[0].field : "",
        direction: "asc"
    });
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onPageChange(newPage + 1);
        setCurrentPage(newPage + 1);
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
            <TableContainer 
                component={Paper} 
                sx={{
                    width: "100%", 
                    height: smallTable ? "80%" : "100vh", 
                    minHeight: smallTable ? "50vh" : "65vh", 
                    maxHeight: smallTable ? "50vh" : "65vh", 
                    overflow: "auto"
                }}
            >
                <Table stickyHeader>
                    {(tableHeaders && !noHeader) &&
                        <TableHead>
                            <TableRow>
                                {tableHeaders?.map((tblHeader, index) => 
                                    <TableCell key={index} sx={{fontWeight: 600}}>
                                        <TableSortLabel
                                            active={sortConfig?.field === tblHeader.field}
                                            direction={sortConfig?.direction === "asc" ? "asc" : "desc"}
                                            onClick={() => {
                                                const isAsc = sortConfig?.field === tblHeader.field && sortConfig?.direction === "asc";
                                                onSort(currentPage, tblHeader.field, !isAsc);
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
                        {tableBody.slice(0, 10).map((tBody, rowIndex) => (
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
                                    } else if (tHeader.field === "petForm") {
                                        return <TableCell key={colIndex} sx={{p: 0}}>
                                            <Accordion sx={{width: "100%", maxWidth: "350px"}}>
                                                <AccordionSummary
                                                    expandIcon={<TextSnippetOutlinedIcon />}
                                                >
                                                    <Typography>{renderCellValue(getNestedValue(tBody, "visitType.typeName"))}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{mt: -3}}>
                                                    <Typography variant="body1" sx={{fontSize: ".9rem", fontWeight: "600"}}><span>Notes</span></Typography>
                                                    <TextField
                                                        variant="outlined" 
                                                        value={renderCellValue(getNestedValue(tBody, "notes"))} 
                                                        size="small" 
                                                        multiline
                                                        disabled
                                                        fullWidth 
                                                        maxRows={4}
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                        </TableCell>
                                    } else if (tHeader.field === "pet.petName") {
                                        return <TableCell key={colIndex} sx={{display: "flex", alignItems: "center"}}>
                                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                                {renderCellValue(getNestedValue(tBody, tHeader.field))}
                                                <Box sx={{display: "flex"}}>
                                                    <Typography sx={{fontSize: ".8rem"}}>
                                                        {renderCellValue(getNestedValue(tBody, "pet.petType.typeName"))} 
                                                    </Typography>
                                                    {tBody.pet.breed !== "" && 
                                                        <Typography sx={{fontSize: ".8rem"}}>
                                                            <span style={{padding: "0px 5px"}}>•</span>
                                                            {`${renderCellValue(getNestedValue(tBody, "pet.breed"))}`}
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
                        {tableBody.length === 0 && 
                            <TableRow>
                                <TableCell colSpan={tableHeaders!.length+1 || 2} sx={{textAlign: "center"}}>
                                    No records found.
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="body1" sx={{fontSize: ".9rem", px: 2}}>Total Rows: {totalCount}</Typography>
                <TablePagination 
                    component="div"
                    count={totalCount}
                    page={page - 1}
                    onPageChange={handlePageChange}
                    rowsPerPage={10}
                    rowsPerPageOptions={[]}
                />
            </Box>
        </React.Fragment>
    );
}

export default DataTable;