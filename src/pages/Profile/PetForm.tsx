import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {PetType} from "../../models/petType";
import {getPetTypes} from "../../api/petTypes";
import {DrawerPanelActions} from "../../components/DrawerPanel";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";

export interface PetData {
    petName: string;
    petType: string;
    breed?: string;
    birthDate?: Dayjs | null;
}

type PetFormProps = {
    type: DrawerPanelActions | string;
    petData: PetData;
    handleFormChange: (key: keyof PetData, value: any) => void;
}

const PetForm: React.FC<PetFormProps> = ({type, petData, handleFormChange}) => {
    const [petTypes, setPetTypes] = useState<PetType[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await getPetTypes();
            setPetTypes(response);
        }
        loadData();
    }, []);

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
            <FormControl size="small">
                <InputLabel id="petType">Pet Types</InputLabel>
                <Select 
                    labelId="petType" 
                    label="Pet Type" 
                    value={petData.petType}
                    onChange={(e) => handleFormChange("petType", e.target.value)} 
                >
                    {petTypes.map(pType => <MenuItem key={pType.petTypeId} value={pType.petTypeId}>{pType.typeName}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField 
                label="Breed" 
                variant="outlined" 
                value={petData.breed} 
                onChange={(e) => handleFormChange("breed", e.target.value)} 
                size="small" 
                fullWidth 
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Birth Date"
                    value={petData.birthDate} 
                    onChange={(e) => handleFormChange("birthDate", e)}
                    slotProps={{textField: {size: "small"}}}
                />
            </LocalizationProvider>
        </React.Fragment>
    );
}

export default PetForm;