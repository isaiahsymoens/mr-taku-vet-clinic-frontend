import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";

import {VisitType} from "../../models/visitType";
import {getVisitTypes} from "../../api/visitTypes";


export interface VisitData {
    owner?: string;
    pet?: string;
    visitType?: string;
    date?: Dayjs | null;
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
    const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await getVisitTypes();
            setVisitTypes(response);
        }
        loadData();
    }, []);

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
                    <FormControl size="small">
                        <InputLabel id="visitType">Visit Type</InputLabel>
                        <Select 
                            labelId="visitType" 
                            label="Visit Type" 
                            value={visitData.visitType} 
                            onChange={(e) => handleFormChange("visitType", e.target.value)}
                        >
                            {visitTypes.map(vType => 
                                <MenuItem 
                                    key={vType.visitTypeId} 
                                    value={vType.visitTypeId}
                                >
                                    {vType.typeName}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={visitData.date} 
                            onChange={(e) => handleFormChange("date", e)}
                            slotProps={{textField: {size: "small"}}}
                        />
                    </LocalizationProvider>
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