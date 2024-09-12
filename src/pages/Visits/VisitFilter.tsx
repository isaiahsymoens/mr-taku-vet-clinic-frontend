import { TextField } from "@mui/material";
import React from "react";

const VisitFilter: React.FC = () => {
    return (
        <React.Fragment>
            <TextField
                label="First Name"
                variant="outlined" 
                value={""} 
                onChange={(e) => {}}
                size="small" 
                fullWidth 
            />
            <TextField
                label="Last Name"
                variant="outlined" 
                value={""} 
                onChange={(e) => {}}
                size="small" 
                fullWidth 
            />
            <TextField
                label="Pet Name"
                variant="outlined" 
                value={""} 
                onChange={(e) => {}}
                size="small" 
                fullWidth 
            />
            <TextField
                label="Pet Type"
                variant="outlined" 
                value={""} 
                onChange={(e) => {}}
                size="small" 
                fullWidth 
            />
            <TextField
                label="Visit Type"
                variant="outlined" 
                value={""} 
                onChange={(e) => {}}
                size="small" 
                fullWidth 
            />
            <TextField
                label="Visit Date"
                variant="outlined" 
                value={""} 
                onChange={(e) => {}}
                size="small" 
                fullWidth 
            />
        </React.Fragment>
    );
}

export default VisitFilter;