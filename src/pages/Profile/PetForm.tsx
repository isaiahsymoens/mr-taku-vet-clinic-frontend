import React, {useEffect, useState} from "react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {PetType} from "../../models/petType";
import {Visit} from "../../models/visit";
import {getPetTypes} from "../../api/petTypes";
import {DrawerPanelActions} from "../../components/DrawerPanel";
import {AddEditPetRequest} from "../../api/pets";
import {GenericErrorResponse} from "../../utils/errorHelper";
import {PaginatedResponse} from "../../models/paginatedResponse";
import {getPetVisits} from "../../api/visits";
import DataTable, { DataTableHeaders } from "../../components/DataTable";

type PetFormProps = {
    type: DrawerPanelActions | string;
    petData: AddEditPetRequest;
    petId: number;
    handleFormChange: (key: keyof AddEditPetRequest, value: any) => void;
    errors: GenericErrorResponse;
}

const tableHeaders: DataTableHeaders[] = [
    {label: "", field: "petForm"}
];

const PetForm: React.FC<PetFormProps> = ({type, petData, petId, handleFormChange, errors}) => {
    const [petTypes, setPetTypes] = useState<PetType[]>([]);
    const [petVisits, setPetVisits] = useState<PaginatedResponse<Visit>>(null!);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            setPetTypes(await getPetTypes());
        }
        loadData();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            const response = await getPetVisits(petId);
            setPetVisits(response);
            setTotalCount(response.totalItems);
        }
        if (type === DrawerPanelActions.View) {
            loadData();
        }
    }, [type === DrawerPanelActions.View]);

    const hasError = (field: string) => field in errors;

    const handlePageChange = async (newPage: number) => {
        setPage(newPage);
        const response = await getPetVisits(petId, newPage);
        setPetVisits(response);
        setTotalCount(response.totalItems);
    }

    return (
        <React.Fragment>
            {type === DrawerPanelActions.View ?
                <React.Fragment>
                    <DataTable 
                        tableHeaders={tableHeaders} 
                        tableBody={petVisits?.data || []}
                        noHeader={true}
                        smallTable={true}
                        page={page}
                        totalCount={totalCount}
                        onPageChange={handlePageChange}
                    />
                </React.Fragment>
                :
                <React.Fragment>
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        value={petData.petName} 
                        error={hasError("petName")}
                        helperText={errors.petName}
                        onChange={(e) => handleFormChange("petName", e.target.value)} 
                        size="small" 
                        required
                        fullWidth 
                    />
                    <FormControl size="small" required error={hasError("petTypeId")}>
                        <InputLabel id="petType">Pet Type</InputLabel>
                        <Select 
                            labelId="petType" 
                            label="Pet Type" 
                            value={petData.petTypeId}
                            onChange={(e) => handleFormChange("petTypeId", e.target.value)} 
                        >
                            {petTypes.map(pType => <MenuItem key={pType.petTypeId} value={pType.petTypeId}>{pType.typeName}</MenuItem>)}
                        </Select>
                        <FormHelperText>
                            {errors.petTypeId}
                        </FormHelperText>
                    </FormControl>
                    <TextField 
                        label="Breed" 
                        variant="outlined" 
                        value={petData.breed} 
                        error={hasError("breed")}
                        helperText={errors.breed}
                        onChange={(e) => handleFormChange("breed", e.target.value)} 
                        size="small" 
                        fullWidth 
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                        <DatePicker
                            label="Birth Date"
                            value={petData.birthDate} 
                            onChange={(e) => handleFormChange("birthDate", e)}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    required: true,
                                    error: hasError("birthDate"),
                                    helperText: errors?.birthDate
                                }
                            }}
                        />
                    </LocalizationProvider>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default PetForm;