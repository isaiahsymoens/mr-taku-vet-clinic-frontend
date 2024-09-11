import React, {useEffect, useState} from "react";
import {DrawerPanelActions} from "../../components/DrawerPanel";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {Pet} from "../../models/pet";
import {VisitType} from "../../models/visitType";
import {getVisitTypes} from "../../api/visitTypes";
import {AddEditVisitRequest} from "../../api/visits";
import {getUserPetsByUsername} from "../../api/pets";
import {Visit} from "../../models/visit";
import {GenericErrorResponse} from "../../utils/errorHelper";
import dayjs from "dayjs";

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
    errors: GenericErrorResponse;
}

const VisitForm: React.FC<VisitFormProps> = ({type, visitData, selectedVisitData, userList, handleFormChange, errors}) => {
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

    const hasError = (field: string) => field in errors;

    return (
        <React.Fragment>
            {type !== DrawerPanelActions.View &&
                <React.Fragment>
                    <FormControl size="small" required error={hasError("owner")}>
                        <InputLabel id="owner">Owner</InputLabel>
                        <Select 
                            labelId="owner" 
                            label="Owner" 
                            value={visitData.owner} 
                            onChange={(e) => handleFormChange("owner", e.target.value)}
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
                        <FormHelperText>
                            {errors.owner}
                        </FormHelperText>
                    </FormControl>
                    <FormControl size="small" required error={hasError("petId")}>
                        <InputLabel id="pet">Pet</InputLabel>
                        <Select 
                            labelId="pet" 
                            label="Pet" 
                            value={visitData.petId} 
                            onChange={(e) => handleFormChange("petId", e.target.value)}
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
                        <FormHelperText>
                            {errors.petId}
                        </FormHelperText>
                    </FormControl>
                    <FormControl size="small" required error={hasError("visitTypeId")}>
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
                        <FormHelperText>
                            {errors.visitTypeId}
                        </FormHelperText>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={visitData.date} 
                            onChange={(e) => handleFormChange("date", e)}
                            minDate={dayjs()}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    required: true,
                                    error: hasError("date"),
                                    helperText: errors?.date
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <TextField 
                        label="Notes"
                        variant="outlined" 
                        value={visitData.notes} 
                        error={hasError("notes")}
                        helperText={errors.notes}
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