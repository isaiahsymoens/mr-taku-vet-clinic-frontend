import React, {useEffect, useState} from "react";
import {Box, Button, InputBase, MenuItem, Select, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {PetType} from "../../models/petType";
import {VisitType} from "../../models/visitType";
import {getPetTypes} from "../../api/petTypes";
import {getVisitTypes} from "../../api/visitTypes";

export interface VisitFilterModel {
    firstName?: string;
    lastName?: string;
    petName?: string;
    petType?: string;
    visitType?: string;
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
    const [petTypes, setPetTypes] = useState<PetType[]>([]);
    const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setPetTypes(await getPetTypes());
            setVisitTypes(await getVisitTypes());
        }
        loadData();
    }, []);

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
                <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                    <Typography variant="subtitle2" sx={{width: "110px", whiteSpace: "nowrap", color: "#5F6368", fontSize: "14px", fontWeight: 100}}>
                        Pet Type:
                    </Typography>
                    <Select
                        sx={{
                            width: "100%",
                            fontSize: ".9rem",
                            px: 0,
                            boxShadow: "none",
                            ".MuiOutlinedInput-notchedOutline": { 
                                border: 0,
                                borderBottom: "1px solid #000",
                                borderRadius: "0px"
                            },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                border: 0,
                                borderBottom: "1px solid #000",
                                borderRadius: "0px"
                            },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: 0,
                                borderBottom: "1px solid #000",
                                borderRadius: "0px"
                            },
                            "& .MuiSelect-select": {
                                p: 0,
                                fontSize: ".9rem"
                            }
                          }}
                        value={visitForm?.petType}
                        onChange={(e) => onFormChangeVisitFilter("petType", e.target.value)} 
                    >
                        {petTypes.map(pType => 
                            <MenuItem 
                                key={pType.petTypeId} 
                                value={pType.typeName}
                                sx={{fontSize: ".9rem"}}
                            >
                                {pType.typeName}
                            </MenuItem>
                        )}
                    </Select>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                    <Typography variant="subtitle2" sx={{width: "110px", whiteSpace: "nowrap", color: "#5F6368", fontSize: "14px", fontWeight: 100}}>
                        Visit Type:
                    </Typography>
                    <Select
                        sx={{
                            width: "100%",
                            fontSize: ".9rem",
                            px: 0,
                            boxShadow: "none",
                            ".MuiOutlinedInput-notchedOutline": { 
                                border: 0,
                                borderBottom: "1px solid #000",
                                borderRadius: "0px"
                            },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                border: 0,
                                borderBottom: "1px solid #000",
                                borderRadius: "0px"
                            },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: 0,
                                borderBottom: "1px solid #000",
                                borderRadius: "0px"
                            },
                            "& .MuiSelect-select": {
                                p: 0,
                                fontSize: ".9rem"
                            }
                          }}
                        value={visitForm?.visitType}
                        onChange={(e) => onFormChangeVisitFilter("visitType", e.target.value)} 
                    >
                        {visitTypes.map(vType => 
                            <MenuItem 
                                key={vType.visitTypeId} 
                                value={vType.typeName}
                                sx={{fontSize: ".9rem"}}
                            >
                                {vType.typeName}
                            </MenuItem>
                        )}
                    </Select>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                    <Typography variant="subtitle2" sx={{width: "110px", whiteSpace: "nowrap", color: "#5F6368", fontSize: "14px", fontWeight: 100}}>
                        Date Range:
                    </Typography>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1, ml: .5}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={visitForm?.visitDateFrom}
                                slotProps={{
                                    textField: {
                                        placeholder: "Start Date",
                                        size: "small",
                                        sx: {
                                            fontSize: ".3rem",
                                            "& .MuiInputBase-input": {
                                                fontSize: ".9rem",
                                                height: "22.5px",
                                                p: 0
                                            },
                                            "& .MuiInputAdornment-root svg": {
                                                fontSize: "1.3rem"
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {border: "none"},
                                                borderBottom: "1px solid #000",
                                                borderRadius: "0px"
                                            }
                                        }
                                    }
                                }}
                                onChange={(e) => onFormChangeVisitFilter("visitDateFrom", e)}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                value={visitForm?.visitDateTo}
                                slotProps={{
                                    textField: {
                                        placeholder: "End Date",
                                        size: "small",
                                        sx: {
                                            fontSize: ".3rem",
                                            "& .MuiInputBase-input": {
                                                fontSize: ".9rem",
                                                height: "22.5px",
                                                p: 0
                                            },
                                            "& .MuiInputAdornment-root svg": {
                                                fontSize: "1.3rem"
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {border: "none"},
                                                borderBottom: "1px solid #000",
                                                borderRadius: "0px"
                                            }
                                        }
                                    }
                                }}
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