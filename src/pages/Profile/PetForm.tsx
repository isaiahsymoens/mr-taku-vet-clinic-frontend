import React from "react";
import {TextField} from "@mui/material";

export interface PetData {
    petName: string;
    petType: string;
    breed?: string;
    birthDate?: string;
}

export enum PetTypes {
    Add = "Add",
    Edit = "Edit",
    View = "View",
    Delete = "Delete"
}

type PetFormProps = {
    type: PetTypes | string;
    petData: PetData;
    handleFormChange: (key: keyof PetData, value: any) => void;
}

const PetForm: React.FC<PetFormProps> = ({type, petData, handleFormChange}) => {
    return (
        <React.Fragment>
            <TextField 
                label="Name" 
                variant="outlined" 
                value={petData.petName} 
                onChange={(e) => handleFormChange("petName", e.target.value)} 
                size="small" 
                fullWidth 
            />
            <TextField 
                label="Pet Type" 
                variant="outlined" 
                value={petData.petType}
                onChange={(e) => handleFormChange("petType", e.target.value)}  
                size="small" 
                fullWidth 
            />
            <TextField 
                label="Breed" 
                variant="outlined" 
                value={petData.breed} 
                onChange={(e) => handleFormChange("breed", e.target.value)} 
                size="small" 
                fullWidth 
            />
            <TextField 
                label="Birth Date" 
                variant="outlined" 
                value={petData.birthDate} 
                onChange={(e) => handleFormChange("birthDate", e.target.value)} 
                size="small" 
                fullWidth 
            />
        </React.Fragment>
    );
}

export default PetForm;