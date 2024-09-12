import React, {useEffect, useState} from "react";
import {Box, Button, InputBase, Typography} from "@mui/material";

export interface VisitFilterModel {
    firstName?: string;
    lastName?: string;
    petName?: string;
    petType?: string;
}

type VisitFilterProps = {
    onSearch: (data: VisitFilterModel) => void;
}

const initialState: VisitFilterModel = {firstName: "", lastName: "", petName: "", petType: ""}

const VisitFilter: React.FC<VisitFilterProps> = ({onSearch}) => {
    const [visitForm, setVisitForm] = useState<VisitFilterModel>(initialState);
    
    const handleSearch = () => {
        const data = Object.fromEntries(
            Object.entries(visitForm)
                .filter(([key, value]) => value !== "" && value != null)
        );
        onSearch(data);
    } 

    const handleClear = () => {
        setVisitForm(initialState);
    }

    const handleFormChange = (key: keyof VisitFilterModel, value: any) => {
        setVisitForm((prevData) => ({...prevData, [key]: value}));
    }

    return (
        <React.Fragment>
            <Box sx={{width: "100%", minWidth: "350px", maxWidth: "350px", px: 3, py: 2, mt: 2}}>
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
                        onChange={(e) => handleFormChange("firstName", e.target.value)}
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
                        onChange={(e) => handleFormChange("lastName", e.target.value)}
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
                        onChange={(e) => handleFormChange("petName", e.target.value)}
                    />
                </Box>
                <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
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
                        value={visitForm?.petType}
                        onChange={(e) => handleFormChange("petType", e.target.value)}
                    />
                </Box>
                <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end", gap: 1, mt: 2}}>
                    <Button 
                        variant="outlined" 
                        sx={{
                            fontSize: ".8rem", 
                            textTransform: "none", 
                            padding: "4px 8px"
                        }}
                        onClick={handleClear}
                    >Clear</Button>
                    <Button 
                        variant="contained" 
                        sx={{
                            fontSize: ".8rem", 
                            textTransform: "none", 
                            padding: "4px 8px"
                        }}
                        onClick={handleSearch}
                    >Search</Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default VisitFilter;