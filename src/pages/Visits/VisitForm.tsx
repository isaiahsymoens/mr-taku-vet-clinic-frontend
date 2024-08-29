import React from "react";
import {TextField} from "@mui/material";

export interface VisitData {
    owner?: string;
    pet?: string;
    visitType?: string;
    visitDate?: string;
    notes?: string;
}

export enum VisitTypes {
    Add = "Add",
    Edit = "Edit",
    View = "View",
    Delete = "Delete"
}

type VisitFormProps = {
    type: VisitTypes | string;
    visitData: VisitData;
    handleFormChange: (key: keyof VisitData, value: any) => void;
}

const VisitForm: React.FC<VisitFormProps> = ({type, visitData, handleFormChange}) => {
    return (
        <React.Fragment>
            {type !== VisitTypes.View &&
                <React.Fragment>
                    <TextField 
                        label="Owner" 
                        variant="outlined" 
                        value={visitData.owner} 
                        onChange={(e) => handleFormChange("owner", e.target.value)} 
                        size="small" 
                        fullWidth 
                    />
                    <TextField 
                        label="Pet" 
                        variant="outlined" 
                        value={visitData.pet} 
                        onChange={(e) => handleFormChange("pet", e.target.value)}
                        size="small" 
                        fullWidth 
                    />
                    <TextField 
                        label="Visit Type" 
                        variant="outlined" 
                        value={visitData.visitType} 
                        onChange={(e) => handleFormChange("visitType", e.target.value)}
                        size="small" 
                        fullWidth 
                    />
                    <TextField 
                        label="Visit Date" 
                        variant="outlined" 
                        value={visitData.visitDate} 
                        onChange={(e) => handleFormChange("visitDate", e.target.value)}
                        size="small" 
                        fullWidth 
                    />
                </React.Fragment>
            }
            <TextField 
                label="Notes"
                variant="outlined" 
                value={visitData.notes} 
                onChange={(e) => handleFormChange("notes", e.target.value)}
                size="small" 
                multiline
                rows={4}
                disabled={type === VisitTypes.View}
                fullWidth 
            />
        </React.Fragment>
    );
}

export default VisitForm;