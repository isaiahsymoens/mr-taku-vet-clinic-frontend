import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {Pet} from "../../models/pet";
import {VisitType} from "../../models/visitType";
import {getVisitTypes} from "../../api/visitTypes";
import {getUserPetsByUsername} from "../../api/pets";
import {Visit} from "../../models/visit";
import { DrawerPanelActions } from "../../components/DrawerPanel";
import { AddVisitRequest } from "../../api/visits";

export interface UserList {
    username: string;
    name: string;
}

type VisitFormProps = {
    type: DrawerPanelActions | string;
    visitData: AddVisitRequest;
    selectedVisitData: Visit;
    userList: UserList[];
    handleFormChange: (key: keyof AddVisitRequest, value: any) => void;
}

const VisitForm: React.FC<VisitFormProps> = ({type, visitData, selectedVisitData, userList, handleFormChange}) => {
    const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);
    const [petNames, setPetNames] = useState<Pet[]>([]);
    const [owner, setOwner] = useState<string>("");

    useEffect(() => {
        const loadData = async () => {
            setVisitTypes(await getVisitTypes());
        }
        loadData();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            setPetNames(await getUserPetsByUsername(owner));
        }
        if (owner !== "") loadData();
    }, [owner]);

    return (
        <React.Fragment>
            {type !== DrawerPanelActions.View &&
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
                            value={visitData.petId} 
                            onChange={(e) => handleFormChange("petId", e.target.value)}
                            required
                        >
                            {petNames.map((pet, index) => 
                                <MenuItem 
                                    key={index} 
                                    value={pet.petId}
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
                            value={visitData?.visitTypeId} 
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
                    <TextField 
                        label="Notes"
                        variant="outlined" 
                        value={visitData.notes} 
                        onChange={(e) => handleFormChange("notes", e.target.value)}
                        size="small" 
                        multiline
                        rows={4}
                        disabled={type === DrawerPanelActions.View}
                        fullWidth 
                        required
                    />
                </React.Fragment>
            }
            {type === DrawerPanelActions.View &&
                <React.Fragment>
                    <TextField 
                        label="Notes"
                        variant="outlined" 
                        value={selectedVisitData.notes} 
                        onChange={(e) => handleFormChange("notes", e.target.value)}
                        size="small" 
                        multiline
                        rows={4}
                        disabled={type === DrawerPanelActions.View}
                        fullWidth 
                        required
                    />
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default VisitForm;