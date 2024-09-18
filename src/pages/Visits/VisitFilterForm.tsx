import React from "react";
import {Box, Button, InputBase, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";

export interface VisitFilterModel {
    firstName?: string;
    lastName?: string;
    petName?: string;
    typeName?: string;
    visitDateFrom?: Dayjs | null;
    visitDateTo?: Dayjs | null;
}

type VisitFilterProps = {
    onSearch: () => void;
    visitForm: VisitFilterModel;
    onFormChangeVisitFilter: (key: keyof VisitFilterModel, value: any) => void;
    onClearVisitFilter: () => void;
}

const VisitFilter: React.FC<VisitFilterProps> = ({onSearch, visitForm, onFormChangeVisitFilter, onClearVisitFilter}) => {
    return (
        <React.Fragment>
            <Box sx={{width: "100%", minWidth: "350px", maxWidth: "370px", px: 3, py: 2, mt: 2}}>
                <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                    <Typography variant="subtitle2" sx={{width: "110px", whiteSpace: "nowrap", color: "#5F6368", fontSize: "14px", fontWeight: 100}}>
                        First Name:
                    </Typography>
                    <InputBase
                        id="firstName"
                        sx={{
                            borderBottom: "0.5px solid #5F6368",
                            width: "100%",
                            fontSize: ".9rem",
                            input: {padding: 0}
                        }}
                        value={visitForm?.firstName}
                        onChange={(e) => onFormChangeVisitFilter("firstName", e.target.value)}
                    />
                </Box>
                <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                    <Typography variant="subtitle2" sx={{width: "110px", whiteSpace: "nowrap", color: "#5F6368", fontSize: "14px", fontWeight: 100}}>
                        Last Name:
                    </Typography>
                    <InputBase
                        id="lastName"
                        sx={{
                            borderBottom: "0.5px solid #5F6368",
                            width: "100%",
                            fontSize: ".9rem",
                            input: {padding: 0}
                        }}
                        value={visitForm?.lastName}
                        onChange={(e) => onFormChangeVisitFilter("lastName", e.target.value)}
                    />
                </Box>
                <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                    <Typography variant="subtitle2" sx={{width: "110px", whiteSpace: "nowrap", color: "#5F6368", fontSize: "14px", fontWeight: 100}}>
                        Pet Name:
                    </Typography>
                    <InputBase
                        id="petName"
                        sx={{
                            borderBottom: "0.5px solid #5F6368",
                            width: "100%",
                            fontSize: ".9rem",
                            input: {padding: 0}
                        }}
                        value={visitForm?.petName}
                        onChange={(e) => onFormChangeVisitFilter("petName", e.target.value)}
                    />
                </Box>
                <Box sx={{display: "flex", alignItems: "center", mb: 1.5}}>
                    <Typography variant="subtitle2" sx={{width: "110px", whiteSpace: "nowrap", color: "#5F6368", fontSize: "14px", fontWeight: 100}}>
                        Pet Type:
                    </Typography>
                    <InputBase
                        id="petType"
                        sx={{
                            borderBottom: "0.5px solid #5F6368",
                            width: "100%",
                            fontSize: ".9rem",
                            input: {padding: 0}
                        }}
                        value={visitForm?.typeName}
                        onChange={(e) => onFormChangeVisitFilter("typeName", e.target.value)}
                    />
                </Box>
                <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                    <Typography variant="subtitle2" sx={{width: "110px", whiteSpace: "nowrap", color: "#5F6368", fontSize: "14px", fontWeight: 100}}>
                        Date Range:
                    </Typography>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1, ml: .5}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date" 
                                value={visitForm?.visitDateFrom}
                                slotProps={{textField: {size: "small"}}}
                                onChange={(e) => onFormChangeVisitFilter("visitDateFrom", e)}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="End Date" 
                                value={visitForm?.visitDateTo}
                                slotProps={{textField: {size: "small"}}}
                                onChange={(e) => onFormChangeVisitFilter("visitDateTo", e)}
                                minDate={visitForm.visitDateFrom as Dayjs}
                                disabled={visitForm.visitDateFrom === null}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end", gap: 1, mt: 2}}>
                    <Button 
                        variant="outlined" 
                        sx={{
                            fontSize: ".8rem", 
                            textTransform: "none", 
                            padding: "4px 8px"
                        }}
                        onClick={onClearVisitFilter}
                    >Clear</Button>
                    <Button 
                        variant="contained" 
                        sx={{
                            fontSize: ".8rem", 
                            textTransform: "none", 
                            padding: "4px 8px"
                        }}
                        onClick={onSearch}
                    >Search</Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default VisitFilter;