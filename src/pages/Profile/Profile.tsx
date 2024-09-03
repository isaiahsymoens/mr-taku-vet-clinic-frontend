import React, {useState} from "react";

import SubHeader from "../../components/SubHeader";
import CustomTable, {TableHeaders} from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import PetForm, {PetData} from "./PetForm";
import UserForm, {UserData, UserTypes} from "../Users/UserForm";

import {RootState} from "../../redux";
import {useSelector} from "react-redux";
import {LoaderFunctionArgs, useParams} from "react-router-dom";
import {Box, Typography, Button} from "@mui/material";
import ProfileCard from "../../components/ProfileCard";
import { getUserByUsername } from "../../api/users";
import { getUserPetsByUsername } from "../../api/pets";

const tableData = {
    tableBody: [
        {name: "Brownie", petType: "Dog", breed: "Golden Retriever", birthDate: "01/01/2024"},
        {name: "Blacky", petType: "Dog", breed: "Golden Retriever", birthDate: "01/02/2024"},
    ],
}

const tableHeaders: TableHeaders[] = [
    {label: "Name", field: "name"},
    {label: "Pet Type", field: "petType"},
    {label: "Breed", field: "breed"},
    {label: "Birth Date", field: "birthDate"},
];

const initialStatePet: PetData = {
    name: "",
    petType: "",
    breed: "",
    birthDate: "", 
}

const Profile = () => {
    const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
    const [isPetDrawerOpen, setIsPetDrawerOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>({});
    const [petData, setPetData] = useState<PetData>(initialStatePet);

    const pets = useSelector((state: RootState) => state.pet.pets);

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

    const toggleUserDrawer = () => {
        setIsUserDrawerOpen(prev => !prev);
    }

    const togglePetDrawer = () => {
        setIsPetDrawerOpen(prev => !prev);
    }

    const handleFormChange = (key: keyof PetData | keyof UserData, value: any) => {
        setPetData((prevData) => ({...prevData, [key]: value}));
    }

    const handleUserSave = () => {

    }

    const handlePetSave = () => {
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
                    <ProfileCard toggleUserDrawer={toggleUserDrawer}/>
                    <Box sx={{ 
                        width: {
                            xs: "100%",
                            md: "70%",
                        }, 
                        overflow: "hidden",
                        boxShadow: 3 
                    }}>
                        <Box sx={{ marginTop: "-48px" }}>
                            <SubHeader text="Pets" btnText="Add Pet" toggleDrawer={togglePetDrawer} />
                        </Box>
                        <CustomTable 
                            tableHeaders={tableHeaders} 
                            tableBody={tableData.tableBody}
                            menuActions={menuActions}
                        />
                    </Box>
                </Box>
            </Box>
            <CustomDrawer 
                open={isUserDrawerOpen} 
                onCancel={toggleUserDrawer} 
                onSave={handleUserSave} 
                drawerHeader="Edit User"
            >
                <UserForm
                    type={UserTypes.Edit} 
                    userData={userData} 
                    handleFormChange={handleFormChange} 
                />
            </CustomDrawer>
            <CustomDrawer 
                open={isPetDrawerOpen} 
                onCancel={togglePetDrawer} 
                onSave={handlePetSave} 
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

export const loader = async ({params}: LoaderFunctionArgs<{username: string}>) => {
    const {username} = params;
    console.log("username :", username);

    const userResponse = await getUserByUsername(username as string);
    console.log("profile userResponse response :", userResponse);

    const userPetsResponse = await getUserPetsByUsername(username as string);
    console.log("profile userPetsResponse response :", userPetsResponse);

    return null;
}