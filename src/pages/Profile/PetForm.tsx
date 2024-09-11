import React, {useEffect, useState} from "react";
import {
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    FormControl, 
    FormHelperText, 
    InputLabel, 
    MenuItem, 
    Paper, 
    Select, 
    Table, 
    TableBody, 
    TableContainer, 
    TextField, 
    Typography
} from "@mui/material";
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {PetType} from "../../models/petType";
import {Visit} from "../../models/visit";
import {getPetTypes} from "../../api/petTypes";
import {DrawerPanelActions} from "../../components/DrawerPanel";
import {AddEditPetRequest} from "../../api/pets";
import {GenericErrorResponse} from "../../utils/errorHelper";

type PetFormProps = {
    type: DrawerPanelActions | string;
    petData: AddEditPetRequest;
    petVisits: Visit[];
    handleFormChange: (key: keyof AddEditPetRequest, value: any) => void;
    errors: GenericErrorResponse;
}

const PetForm: React.FC<PetFormProps> = ({type, petData, petVisits, handleFormChange, errors}) => {
    const [petTypes, setPetTypes] = useState<PetType[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setPetTypes(await getPetTypes());
        }
        loadData();
    }, []);

    const hasError = (field: string) => field in errors;

    return (
        <React.Fragment>
            {type === DrawerPanelActions.View ?
                <React.Fragment>
                    <TableContainer component={Paper} sx={{ width: "100%", height: "100%", overflow: "auto" }}>
                        <Table>
                            <TableBody>
                                {petVisits.map((pVisit, index) =>
                                    <Accordion key={index} sx={{width: "100%"}}>
                                        <AccordionSummary
                                            expandIcon={<TextSnippetOutlinedIcon />}
                                        >
                                            <Typography>{pVisit.visitType?.typeName}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="body1" sx={{fontSize: "1rem", fontWeight: "600"}}>Notes</Typography>
                                        <Typography>
                                            {pVisit.notes}
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                        fullWidth 
                    />
                    <FormControl size="small" error={hasError("petTypeId")}>
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
                            slotProps={{textField: {size: "small"}}}
                        />
                    </LocalizationProvider>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default PetForm;