import React, {useEffect, useState} from "react";

import SubHeader from "../../components/SubHeader";
import CustomTable, {TableHeaders} from "../../components/CustomTable";
import CustomDrawer from "../../components/CustomDrawer";
import PetForm, {PetData} from "./PetForm";
import UserForm, {UserData, UserTypes} from "../Users/UserForm";
import ProfileCard from "../../components/ProfileCard";

import {getUserByUsername} from "../../api/users";
import {getUserPetsByUsername} from "../../api/pets";
import {petActions} from "../../redux/features/pet";
import {User} from "../../models/user";
import {Pet} from "../../models/pet";

import {RootState} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {Box} from "@mui/material";

const tableHeaders: TableHeaders[] = [
    {label: "Name", field: "petName"},
    {label: "Pet Type", field: "petType"},
    {label: "Breed", field: "breed"},
    {label: "Birth Date", field: "birthDate"},
];

const initialStatePet: PetData = {
    petName: "",
    petType: "",
    breed: "",
    birthDate: "", 
}

type LoaderData = {
    user: User;
    userPets: Pet[];
}

const Profile = () => {
    const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
    const [isPetDrawerOpen, setIsPetDrawerOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>({});
    const [petData, setPetData] = useState<PetData>(initialStatePet);

    const dispatch = useDispatch();
    const {user, userPets} = useLoaderData() as LoaderData;
    const pets = useSelector((state: RootState) => state.pet.pets);

    useEffect(() => {
        console.log("user :", user);
        console.log("userPets :", userPets);
        dispatch(petActions.storePets(userPets));
    }, [dispatch]);

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
                            tableBody={pets}
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
    const user = await getUserByUsername(username as string);
    const userPets = await getUserPetsByUsername(username as string);

    return {user, userPets};
}