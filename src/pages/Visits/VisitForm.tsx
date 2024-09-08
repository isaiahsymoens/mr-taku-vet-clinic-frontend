import React, {useEffect, useState} from "react";
import {DrawerPanelActions} from "../../components/DrawerPanel";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {Pet} from "../../models/pet";
import {VisitType} from "../../models/visitType";
import {getVisitTypes} from "../../api/visitTypes";
import {AddEditVisitRequest} from "../../api/visits";
import {getUserPetsByUsername} from "../../api/pets";
import {Visit} from "../../models/visit";

export interface UserList {
    username: string;
    name: string;
}

type VisitFormProps = {
    type: DrawerPanelActions | string;
    visitData: AddEditVisitRequest;
    selectedVisitData: Visit;
    userList: UserList[];
    handleFormChange: (key: keyof AddEditVisitRequest, value: any) => void;
}

const VisitForm: React.FC<VisitFormProps> = ({type, visitData, selectedVisitData, userList, handleFormChange}) => {
    const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);
    const [petNames, setPetNames] = useState<Pet[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setVisitTypes(await getVisitTypes());
        }
        loadData();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            setPetNames(await getUserPetsByUsername(visitData.owner));
        }
        if (visitData?.owner) loadData();
    }, [visitData.owner]);

    return (
        <React.Fragment>
            {type !== DrawerPanelActions.View &&
                <React.Fragment>
                    <FormControl size="small">
                        <InputLabel id="owner">Owner*</InputLabel>
                        <Select 
                            labelId="owner" 
                            label="Owner" 
                            value={visitData.owner} 
                            onChange={(e) => handleFormChange("owner", e.target.value)}
                            required
                            disabled={type === DrawerPanelActions.Edit}
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
                            disabled={type === DrawerPanelActions.Edit}
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