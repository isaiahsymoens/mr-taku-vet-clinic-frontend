import React, {useState, useEffect} from "react";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import {Box, Typography, Button, TextField} from "@mui/material";

const tableData = {
    tableHeaders: [
        {label: "Name", field: "name"},
        {label: "Email", field: "email"},
        {label: "Pet Owned", field: "petOwned"},
    ],
    tableBody: [
        {email: "test@gmail.com", name: "Test test", petOwned: 0},
        {email: "test1@gmail.com", name: "Test test 1", petOwned: 1},
    ],
}

interface PetData {
    name: string;
    petType: string;
    breed: string;
    birthDate: string;
}

const initialState: PetData = {
    name: "",
    petType: "",
    breed: "",
    birthDate: "", 
}

const Profile = () => {
    

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [visitData, setVisitData] = useState<PetData>(initialState);

    useEffect(() => {
        // TODO: use api
        // setVisitDate();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
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
                        <CustomTable tableHeaders={tableData.tableHeaders} tableBody={tableData.tableBody}/>
                    </Box>
                </Box>
            </Box>
            <CustomDrawer 
                open={isDrawerOpen} 
                onCancel={toggleDrawer} 
                onSave={handleSave} 
                drawerHeader="Add Pet"
            >
                <TextField 
                    label="Name" 
                    variant="outlined" 
                    value={visitData.name} 
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Pet Type" 
                    variant="outlined" 
                    value={visitData.petType} 
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Breed" 
                    variant="outlined" 
                    value={visitData.breed} 
                    size="small" 
                    fullWidth 
                />
                <TextField 
                    label="Birth Date" 
                    variant="outlined" 
                    value={visitData.birthDate} 
                    size="small" 
                    fullWidth 
                />
            </CustomDrawer>
        </React.Fragment>
    );
}

export default Profile;