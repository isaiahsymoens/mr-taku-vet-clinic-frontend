import React, {useEffect, useState} from "react";

import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel, {DrawerPanelActions} from "../../components/DrawerPanel";
import PetForm from "./PetForm";
import UserForm from "../Users/UserForm";
import ProfileCard from "../../components/ProfileCard";
import ActionDialog from "../../components/ActionDialog";

import {Pet} from "../../models/pet";
import {User} from "../../models/user";
import {Visit} from "../../models/visit";

import {AddEditPetRequest, addPet, deletePet, getUserPetsByUsername, updatePet} from "../../api/pets";
import {AddEditUserRequest, getUserByUsername, updateUser} from "../../api/users";
import {getPetVisits} from "../../api/visits";

import {RootState} from "../../redux";
import {petActions} from "../../redux/features/pet";
import {userActions} from "../../redux/features/user";
import {useDispatch, useSelector} from "react-redux";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";

import {Alert, Box} from "@mui/material";

const tableHeaders: DataTableHeaders[] = [
    {label: "Name", field: "petName"},
    {label: "Birth Date", field: "birthDate"},
    {label: "No. of Visits", field: "numberOfVisits"},
];

const initialStatePet: AddEditPetRequest = {
    username: "",
    petName: "",
    petTypeId: 0,
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
    const [userData, setUserData] = useState<AddEditUserRequest>(null!);
    const [orgUserData, setOrgUserData] = useState<AddEditUserRequest>(null!);
    const [petData, setPetData] = useState<AddEditPetRequest>(initialStatePet);
    const [petVisitsData, setPetVisitsData] = useState<Visit[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet>(null!);
    const [petDrawerType, setPetDrawerType] = useState<DrawerPanelActions | string>("");
    const [isActionDialog, setIsActionDialog] = useState(false);
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch();
    const {loaderUser, loaderUserPets} = useLoaderData() as LoaderData;
    const pets = useSelector((state: RootState) => state.pet.pets);
    const user = useSelector((state: RootState) => state.user.userProfile);

    useEffect(() => {
        if (loaderUser) {
            setUserData(loaderUser);
            setOrgUserData(loaderUser);
            dispatch(userActions.setUserProfile(loaderUser));
        }
        if (loaderUserPets) {
            dispatch(petActions.storePets(loaderUserPets));
        }
    }, [dispatch]);

    const handleAdd = () => {
        setPetDrawerType(DrawerPanelActions.Add);
        togglePetDrawer();
    }

    const handleEdit = (data: Pet) => {
        setPetData({
            ...data,
            username: data.user?.username as string, 
            petTypeId: data.petType?.petTypeId as number
        });
        setPetDrawerType(DrawerPanelActions.Edit);
        togglePetDrawer();
    }

    const handleView = async (data: Pet) => {
        setPetVisitsData(await getPetVisits(data.petId as number));
        setPetDrawerType(DrawerPanelActions.View);
        togglePetDrawer();
    }

    const handleDelete = (data: Pet) => {
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

    const handlePetFormChange = (key: keyof Pet, value: any) => {
        setPetData((prevData) => ({...prevData, [key]: value}));
    }

    const handleUserFormChange = (key: keyof AddEditUserRequest, value: any) => {
        if (key === "email") {
            setUserData((prevData) => ({...prevData, [key]: value}));
            setUserData((prevData) => ({...prevData, username: value.split("@")[0]}));    
        } else {
            setUserData((prevData) => ({...prevData, [key]: value}));
        }
    }

    const handleEditUserSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let changedData: any = {};
            (Object.keys(userData) as (keyof AddEditUserRequest)[]).forEach(key => {
                if (orgUserData[key] !== userData[key]) {
                    changedData[key] = userData[key];
                }
            });
            const response = await updateUser(orgUserData.username, changedData);
            dispatch(userActions.setUserProfile(response));
            toggleUserDrawer();
            setError("");
        } catch(err) {
            setError((err as any).email);
        }
    }

    const handleAddPetSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await addPet({...petData, username: loaderUser.username});
            dispatch(petActions.addPet(response));
            setPetData(initialStatePet);
            togglePetDrawer();
        } catch (err) {} 
    }

    const handlePetEditSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            dispatch(petActions.updatePet(await updatePet(petData)));
            setPetData(initialStatePet);
            togglePetDrawer();
        } catch(err) {}
    }

    return (
        <React.Fragment>
            <Box sx={{flexGrow: 1, marginTop: "48px", p: 3}}>
                <Box sx={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: {
                        xs: "columm",
                        md: "row"
                    },
                    gap: 3
                }}>
                    <ProfileCard user={user} toggleUserDrawer={toggleUserDrawer}/>
                    <Box sx={{ 
                        width: {
                            xs: "100%",
                            md: "70%",
                        }, 
                        overflow: "hidden",
                        boxShadow: 3 
                    }}>
                        <Box sx={{marginTop: "-48px"}}>
                            <SubHeader text="Pets" btnText="Add Pet" toggleDrawer={handleAdd} />
                        </Box>
                        <DataTable 
                            tableHeaders={tableHeaders} 
                            tableBody={pets}
                            menuActions={(data: Pet) => [
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
                onCancel={() => {toggleUserDrawer(); setError("");}} 
                onSave={handleEditUserSave} 
                drawerHeader="Edit User"
            >
                <UserForm
                    type={DrawerPanelActions.Edit} 
                    userData={userData} 
                    handleFormChange={handleUserFormChange} 
                />
                {error && <Alert severity="error">{error}</Alert>}
            </DrawerPanel>
            <DrawerPanel 
                open={isPetDrawerOpen} 
                onCancel={() => {
                    togglePetDrawer();
                    setSelectedPet(null!);
                    setPetData(initialStatePet);
                }} 
                onSave={petDrawerType === DrawerPanelActions.Add ? handleAddPetSave : handlePetEditSave} 
                showBtn={petDrawerType !== DrawerPanelActions.View}
                drawerHeader={
                    petDrawerType === DrawerPanelActions.Add ? "Add Pet" 
                    : 
                    petDrawerType === DrawerPanelActions.Edit ? "Edit Pet" : "Pet Visits"
                }
            >
                <PetForm
                    type={petDrawerType}
                    petData={petData}
                    handleFormChange={handlePetFormChange}
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