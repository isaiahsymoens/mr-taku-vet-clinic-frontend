import React, {useState} from "react";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import {Box, Typography, Button, TextField} from "@mui/material";
import PetForm, { PetData } from "./PetForm";

const tableData = {
    tableHeaders: [
        {label: "Name", field: "name"},
        {label: "Pet Type", field: "petType"},
        {label: "Breed", field: "breed"},
        {label: "Birth Date", field: "birthDate"},
    ],
    tableBody: [
        {name: "Brownie", petType: "Dog", breed: "Golden Retriever", birthDate: "01/01/2024"},
        {name: "Blacky", petType: "Dog", breed: "Golden Retriever", birthDate: "01/02/2024"},
    ],
}



const initialState: PetData = {
    name: "",
    petType: "",
    breed: "",
    birthDate: "", 
}

const Profile = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [petData, setPetData] = useState<PetData>(initialState);

    const menuActions = (data: PetData) => [
        {
            name: "Edit",
            onClick: () => handleEdit(data),
        },
        {
            name: "View",
            onClick: () => handleView(data),
        },
        {
            name: "Delete",
            onClick: () => handleDelete(data),
        }
    ];

    const handleEdit = (data: PetData) => {
    }

    const handleView = (data: PetData) => {
    }

    const handleDelete = (data: PetData) => {
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const handleFormChange = (key: keyof PetData, value: any) => {
        setPetData((prevData) => ({...prevData, [key]: value}));
    }

    const handleSave = () => {
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, marginTop: "48px", p: 3 }}>
                <Box sx={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: {
                        xs: "columm",
                        md: "row"
                    },
                    gap: 3
                }}>
                    <Box sx={{ 
                        width: {
                            xs: "100%",
                            md: "30%",
                        }, 
                        boxShadow: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center" 
                    }}>
                        <img src="https://cdn.pixabay.com/photo/2024/03/16/20/35/ai-generated-8637800_1280.jpg"
                            height={150}
                            style={{
                                width: "100%",
                                maxWidth: "150px",
                                borderRadius: "10em"
                            }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingY: 2 }}>
                            <Typography variant="subtitle2">Monkey D. Luffy</Typography>
                            <Typography variant="body2" sx={{ paddingBottom: 1.5 }}>monkeydluffy@gmail.com</Typography>
                            <Button variant="contained">Edit Profile</Button>
                        </Box>
                    </Box>
                    <Box sx={{ 
                        width: {
                            xs: "100%",
                            md: "70%",
                        }, 
                        overflow: "hidden",
                        boxShadow: 3 
                    }}>
                        <Box sx={{ marginTop: "-48px" }}>
                            <SubHeader text="Pets" btnText="Add Pet" toggleDrawer={toggleDrawer} />
                        </Box>
                        <CustomTable 
                            tableHeaders={tableData.tableHeaders} 
                            tableBody={tableData.tableBody}
                            menuActions={menuActions}
                        />
                    </Box>
                </Box>
            </Box>
            <CustomDrawer 
                open={isDrawerOpen} 
                onCancel={toggleDrawer} 
                onSave={handleSave} 
                drawerHeader="Add Pet"
            >
                <PetForm
                    type="Add"
                    petData={petData}
                    handleFormChange={handleFormChange}
                />     
            </CustomDrawer>
        </React.Fragment>
    );
}

export default Profile;