import React, {useEffect, useState} from "react";

import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel, {DrawerPanelActions} from "../../components/DrawerPanel";
import PetForm, {PetData} from "./PetForm";
import UserForm, {UserData} from "../Users/UserForm";
import ProfileCard from "../../components/ProfileCard";

import {getUserByUsername} from "../../api/users";
import {addPet, deletePet, getUserPetsByUsername} from "../../api/pets";
import {petActions} from "../../redux/features/pet";
import {User} from "../../models/user";
import {Pet} from "../../models/pet";

import {RootState} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {Box} from "@mui/material";
import ActionDialog from "../../components/ActionDialog";
import { getPetVisits } from "../../api/visits";
import { Visit } from "../../models/visit";

const tableHeaders: DataTableHeaders[] = [
    {label: "Name", field: "petName"},
    {label: "Birth Date", field: "birthDate"},
    {label: "No. of Visits", field: "numberOfVisits"},
];

const initialStatePet: PetData = {
    username: "",
    petName: "",
    petType: "",
    breed: "",
    birthDate: null, 
}

type LoaderData = {
    loaderUser: User;
    loaderUserPets: Pet[];
}

const Profile = () => {
    const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
    const [isPetDrawerOpen, setIsPetDrawerOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>({});
    const [petData, setPetData] = useState<PetData>(initialStatePet);
    const [petVisitsData, setPetVisitsData] = useState<Visit[]>([]);
    const [selectedPet, setSelectedPet] = useState<PetData>(null!);
    const [petDrawerType, setPetDrawerType] = useState<DrawerPanelActions | string>("");
    const [isActionDialog, setIsActionDialog] = useState(false);

    const dispatch = useDispatch();
    const {loaderUser, loaderUserPets} = useLoaderData() as LoaderData;
    const pets = useSelector((state: RootState) => state.pet.pets);

    useEffect(() => {
        if (loaderUserPets) {
            dispatch(petActions.storePets(loaderUserPets));
        }
    }, [dispatch]);

    const handleAdd = () => {
        setPetDrawerType(DrawerPanelActions.Add);
        togglePetDrawer();
    }

    const handleEdit = (data: PetData) => {
        // setSelectedPet(data);
        // setPetDrawerType(DrawerPanelActions.Edit);
        // togglePetDrawer();
    }

    const handleView = async (data: PetData) => {
        // setSelectedPet(data);
        console.log("data :", data);

        const response = await getPetVisits(data.petId as number); 
        console.log("response :", response);

        setPetVisitsData(response);

        setPetDrawerType(DrawerPanelActions.View);
        togglePetDrawer();
    }

    const handleDelete = (data: PetData) => {
        setSelectedPet(data);
        setPetDrawerType(DrawerPanelActions.Delete);
        toggleActionDialog();
    }

    const toggleUserDrawer = () => {
        setIsUserDrawerOpen(prev => !prev);
    }

    const togglePetDrawer = () => {
        setIsPetDrawerOpen(prev => !prev);
    }

    const toggleActionDialog = () => {
        setIsActionDialog(prev => !prev);
    }

    const handleSaveConfirmDlg = async () => {
        try {
            await deletePet(selectedPet!.petId as number);
            dispatch(petActions.removePet(selectedPet!.petId as number));
            setPetData(null!);
            toggleActionDialog();
        } catch(err) {}
    }

    const handleFormChange = (key: keyof PetData | keyof UserData, value: any) => {
        setPetData((prevData) => ({...prevData, [key]: value}));
    }

    const handleUserSave = () => {
    }

    const handlePetSave = async () => {
        try {
            const response = await addPet({...petData, username: loaderUser.username});
            dispatch(petActions.addPet(response));
            setPetData(initialStatePet);
            togglePetDrawer();
        } catch (err) {} 
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
                            <SubHeader text="Pets" btnText="Add Pet" toggleDrawer={handleAdd} />
                        </Box>
                        <DataTable 
                            tableHeaders={tableHeaders} 
                            tableBody={pets}
                            menuActions={(data: PetData) => [
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
                            ]}
                        />
                    </Box>
                </Box>
            </Box>
            <DrawerPanel 
                open={isUserDrawerOpen} 
                onCancel={toggleUserDrawer} 
                onSave={handleUserSave} 
                drawerHeader="Edit User"
            >
                <UserForm
                    type={DrawerPanelActions.Edit} 
                    userData={userData} 
                    handleFormChange={handleFormChange} 
                />
            </DrawerPanel>
            <DrawerPanel 
                open={isPetDrawerOpen} 
                onCancel={() => {
                    togglePetDrawer();
                    setSelectedPet(null!);
                    setPetData(initialStatePet);
                }} 
                onSave={handlePetSave} 
                showBtn={petDrawerType !== DrawerPanelActions.View}
                drawerHeader={
                    petDrawerType === DrawerPanelActions.Add ? "Add Pet" 
                    : 
                    petDrawerType === DrawerPanelActions.Edit ? "Edit Pet" : "Pet Visits"
                }
            >
                <PetForm
                    type={petDrawerType}
                    petData={selectedPet === null ? petData : selectedPet}
                    handleFormChange={handleFormChange}
                    petVisits={petVisitsData}
                />     
            </DrawerPanel>
            <ActionDialog
                title="Are you sure you want to delete this pet record?"
                description="This will delete permanently, You cannot undo this action."
                isOpen={isActionDialog}
                onSave={handleSaveConfirmDlg}
                onCancel={toggleActionDialog}
            />
        </React.Fragment>
    );
}

export default Profile;

export const loader = async ({params}: LoaderFunctionArgs<{username: string}>) => {
    const {username} = params;
    const loaderUser = await getUserByUsername(username as string);
    const loaderUserPets = await getUserPetsByUsername(username as string);
    return {loaderUser, loaderUserPets};
}