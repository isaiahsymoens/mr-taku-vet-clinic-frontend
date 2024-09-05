import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {Pet} from "../../models/pet";
import {VisitType} from "../../models/visitType";
import {getVisitTypes} from "../../api/visitTypes";
import {getUserPetsByUsername} from "../../api/pets";
import {Visit} from "../../models/visit";

export interface AddVisitRequest extends Visit {
    petName: string;
}

export enum VisitTypes {
    Add = "Add",
    Edit = "Edit",
    View = "View",
    Delete = "Delete"
}

export type UserList = {
    username: string;
    name: string;
}

type VisitFormProps = {
    type: VisitTypes | string;
    visitData: AddVisitRequest;
    userList: UserList[];
    handleFormChange: (key: keyof AddVisitRequest, value: any) => void;
}

const VisitForm: React.FC<VisitFormProps> = ({type, visitData, userList, handleFormChange}) => {
    const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);
    const [petNames, setPetNames] = useState<Pet[]>([]);
    const [owner, setOwner] = useState<string>("");

    useEffect(() => {
        const loadData = async () => {
            const response = await getVisitTypes();
            setVisitTypes(response);
        }
        loadData();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            const response = await getUserPetsByUsername(owner);
            setPetNames(response);
        }
        if (owner !== "") loadData();
    }, [owner]);

    return (
        <React.Fragment>
            {type !== VisitTypes.View &&
                <React.Fragment>
                    <FormControl size="small">
                        <InputLabel id="owner">Owner*</InputLabel>
                        <Select 
                            labelId="owner" 
                            label="Owner" 
                            value={owner} 
                            onChange={(e) => setOwner(e.target.value)}
                            required
                        >
                            {userList.map(user => 
                                <MenuItem 
                                    key={user.username} 
                                    value={user.username}
                                >
                                    {user.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel id="pet">Pet*</InputLabel>
                        <Select 
                            labelId="pet" 
                            label="Pet" 
                            value={visitData.petName} 
                            onChange={(e) => handleFormChange("petName", e.target.value)}
                            required
                        >
                            {petNames.map((pet, index) => 
                                <MenuItem 
                                    key={index} 
                                    value={pet.petName}
                                >
                                    {pet.petName}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel id="visitType">Visit Type</InputLabel>
                        <Select 
                            labelId="visitType" 
                            label="Visit Type" 
                            value={visitData.visitTypeId} 
                            onChange={(e) => handleFormChange("visitTypeId", e.target.value)}
                            required
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
                required
            />
        </React.Fragment>
    );
}

export default VisitForm;