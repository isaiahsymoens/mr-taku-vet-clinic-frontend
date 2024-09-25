import React, {useEffect, useState} from "react";
import SubHeader from "../../components/SubHeader";
import DataTable, {DataTableHeaders} from "../../components/DataTable";
import DrawerPanel, {DrawerPanelActions} from "../../components/DrawerPanel";
import VisitForm, {UserList} from "./VisitForm";
import ActionDialog from "../../components/ActionDialog";

import {Visit} from "../../models/visit";
import {User} from "../../models/user";
import {addVisit, AddEditVisitRequest, deleteVisit, fetchVisits, updateVisit, searchVisits} from "../../api/visits";
import {fetchUsers} from "../../api/users";

import {RootState} from "../../redux";
import {visitActions} from "../../redux/features/visit";
import {useLoaderData} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Alert, Box, Snackbar} from "@mui/material";
import {GenericErrorResponse} from "../../utils/errorHelper";
import VisitFilter, {VisitFilterModel} from "./VisitFilterForm";
import {PaginatedResponse} from "../../models/paginatedResponse";
import dayjs from "dayjs";

const tableHeaders: DataTableHeaders[] = [
    {label: "Owner", field: "pet.user.name"},
    {label: "Pet", field: "pet.petName"},
    {label: "Visit Type", field: "visitType.typeName"},
    {label: "Visit Date", field: "date"}
];

const initialState: AddEditVisitRequest = {
    owner: "",
    petId: 0,
    visitTypeId: 0, 
    date: null,
    notes: ""
}

const initialStateVisitFilter: VisitFilterModel = {
    firstName: "", 
    lastName: "", 
    petName: "", 
    petType: "",
    visitType: "",
    visitDateFrom: null,
    visitDateTo: null
}

type LoaderData = {
    loaderUsers: PaginatedResponse<User>;
    loaderVisits: PaginatedResponse<Visit>;
}

const VisitsPage: React.FC = () => {
    const [visitData, setVisitData] = useState<AddEditVisitRequest>(initialState);
    const [selectedVisit, setSelectedVisit] = useState<Visit>(null!);
    const [userList, setUserList] = useState<UserList[]>([]);
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isActionDialog, setIsActionDialog] = useState(false);
    const [visitDrawerType, setVisitDrawerType] = useState<DrawerPanelActions | string>("");
    const [snackbarMsg, setSnackbarMsg] = useState<{msg: string, severity: "success" | "error"}>({msg: "", severity: "success"});
    const [errors, setErrors] = useState<GenericErrorResponse>({});
    const [visitFormFilter, setVisitFormFilter] = useState<VisitFilterModel>(initialStateVisitFilter);

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        dispatch(visitActions.setResetFilter(false));
    }, []);

    const dispatch = useDispatch();
    const visits = useSelector((state: RootState) => state.visit.visits);

    const {loaderUsers, loaderVisits} = useLoaderData() as LoaderData;

    useEffect(() => {
        if (loaderUsers) {
            setUserList(loaderUsers.data.filter(u => u.petOwned > 0).map(u => ({
                username: u.username,
                name: `${u.firstName} ${u.middleName} ${u.lastName}`,
            })));
        }
        if (loaderVisits) {
            dispatch(visitActions.setVisits(loaderVisits.data));
            setTotalCount(loaderVisits.totalItems);
        }
    }, [dispatch]);

    const handleEdit = (data: Visit) => {
        setVisitData({
            ...data, 
            owner: data.pet?.user?.username as string,
            petId: data.pet?.petId as number, 
            visitTypeId: data.visitType?.visitTypeId as number
        });
        setVisitDrawerType(DrawerPanelActions.Edit);
        toggleDrawer();
    }

    const handleView = (data: Visit) => {
        setSelectedVisit(data); 
        setVisitDrawerType(DrawerPanelActions.View);
        toggleDrawer();
    }

    const handleDelete = (data: Visit) => {
        setSelectedVisit(data);
        setVisitDrawerType(DrawerPanelActions.Delete);
        toggleActionDialog();
    }

    const handleFormChange = (key: keyof AddEditVisitRequest, value: any) => {
        if (key === "date") {
            const date = value.set("hour", dayjs().hour())
                              .set("minute", dayjs().minute())
                              .set("second", dayjs().second())
                              .set("millisecond", dayjs().millisecond());
            setVisitData((prevData) => ({...prevData, [key]: date}));
        } else {
            setVisitData((prevData) => ({...prevData, [key]: value}));
        }
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const toggleCancelDrawer = () => {
        setIsDrawerOpen(prev => !prev);
        setVisitDrawerType("");
    }

    const toggleActionDialog = () => {
        setIsActionDialog(prev => !prev);
    }

    const handleSaveConfirmDlg = async () => {
        try {
            await deleteVisit(selectedVisit.visitId as number);
            dispatch(visitActions.removeVisit(selectedVisit.visitId));
            setSnackbarMsg({msg: "Successfully deleted.", severity: "success"});
            const response = await fetchVisits(page);
            dispatch(visitActions.setVisits(response.data));
            setTotalCount(response.totalItems);
            setSelectedVisit(null!);
            toggleActionDialog();
        } catch(err) {}
    }

    const handleAddSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await addVisit(visitData as AddEditVisitRequest);
            dispatch(visitActions.addVisit(response));
            setSnackbarMsg({msg: "Successfully added.", severity: "success"});
            setTotalCount(totalCount + 1);
            setVisitData(initialState);
            toggleDrawer();
        } catch(err) {
            setErrors(err as GenericErrorResponse);
        }
    }

    const handleEditSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await updateVisit(visitData);
            dispatch(visitActions.updateVisit(response));
            setVisitData(initialState);
            toggleDrawer();
        } catch(err) {
            setErrors(err as GenericErrorResponse);
        }
    }

    const handleAdd = () => {
        setVisitDrawerType(DrawerPanelActions.Add);
        toggleDrawer();
    }

    const handleFormChangeVisitFilter = (key: keyof VisitFilterModel, value: any) => {
        if (key === "visitDateFrom" || key === "visitDateTo") {
            const date = value.set("hour", dayjs().hour())
                              .set("minute", dayjs().minute())
                              .set("second", dayjs().second())
                              .set("millisecond", dayjs().millisecond());
            setVisitFormFilter((prevData) => ({...prevData, [key]: date}));
        } else {
            setVisitFormFilter((prevData) => ({...prevData, [key]: value}));
        }
    }

    const handleClearVisitFilter = () => {
        setVisitFormFilter(initialStateVisitFilter);
    }
    
    const handleSearch = async () => {
        const data = Object.fromEntries(
            Object.entries(visitFormFilter)
                .filter(([_key, value]) => value !== "" && value != null)
        );
        if (Object.keys(data).length > 0) {
            const response = await searchVisits(data);
            dispatch(visitActions.setVisits(response.data));
            dispatch(visitActions.setResetFilter(true));
            setTotalCount(response.totalItems);
            setPage(1);
        } else if (Object.keys(data).length == 0 && Object.keys(visitFormFilter).length > 0) {
            const response = await fetchVisits();
            dispatch(visitActions.setVisits(response.data));
            setTotalCount(response.totalItems);
            dispatch(visitActions.setResetFilter(false));
            setVisitFormFilter(initialStateVisitFilter);
            setPage(1);
        }
        dispatch(visitActions.setCloseFilter(true));
    }

    const resetSearch = async () => {
        const response = await fetchVisits();
        dispatch(visitActions.setVisits(response.data));
        setTotalCount(response.totalItems);
        dispatch(visitActions.setResetFilter(false));
        setVisitFormFilter(initialStateVisitFilter);
        setPage(1);
    }

    const handlePageChange = async (newPage: number) => {
        setPage(newPage);
        const response = await fetchVisits(newPage);
        dispatch(visitActions.setVisits(response.data));
        setTotalCount(response.totalItems);
    }

    const handleSort = async (currentPage: number, headerColumn: string, isAsc: boolean) => {
        let response;
        const data = Object.fromEntries(
            Object.entries(visitFormFilter)
                .filter(([_key, value]) => value !== "" && value != null)
        );
        if (Object.keys(data).length > 0) {
            response = await searchVisits(data, headerColumn, isAsc);
        } else {
            response = await fetchVisits(currentPage, headerColumn, isAsc);
        }
        dispatch(visitActions.setVisits(response.data));
        setTotalCount(response.totalItems);
    }

    return (
        <Box>
            <SubHeader 
                text="Visits" 
                btnText="Add Visit" 
                toggleDrawer={handleAdd} 
                filterMenuItems={
                    <VisitFilter 
                        onSearch={handleSearch} 
                        visitForm={visitFormFilter}
                        onFormChangeVisitFilter={handleFormChangeVisitFilter}
                        onClearVisitFilter={handleClearVisitFilter}
                    />
                }
                resetSearch={resetSearch}
            />
            <Box sx={{flexGrow: 1, p: 3}}>
                <DataTable 
                    tableHeaders={tableHeaders} 
                    tableBody={visits}
                    menuActions={(data: Visit) => [
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
                    onSort={handleSort}
                    page={page}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                />
            </Box>
            <DrawerPanel 
                open={isDrawerOpen} 
                onCancel={() => {
                    toggleCancelDrawer();
                    setVisitData(initialState);
                    setSelectedVisit(null!);
                }} 
                onSave={visitDrawerType === DrawerPanelActions.Add ? handleAddSave : handleEditSave} 
                drawerHeader={
                    visitDrawerType === DrawerPanelActions.Add ? "Add Visit"
                    :
                    visitDrawerType === DrawerPanelActions.Edit ? "Edit Visit" : "View Visit"
                }
                showBtn={visitDrawerType !== DrawerPanelActions.View}
            >
                <VisitForm 
                    type={visitDrawerType}
                    visitData={visitData}
                    selectedVisitData={selectedVisit}
                    userList={userList}
                    handleFormChange={handleFormChange}
                    errors={errors}
                />
            </DrawerPanel>
            <ActionDialog
                title="Are you sure you want to delete this visit record?"
                description="This will delete permanently, You cannot undo this action."
                isOpen={isActionDialog}
                onSave={handleSaveConfirmDlg}
                onCancel={toggleActionDialog}
            />
            <Snackbar 
                open={snackbarMsg.msg !== ""} 
                autoHideDuration={3000} 
                onClose={() => setSnackbarMsg({msg: "", severity: "success"})}
            >
                <Alert
                    severity="success"
                    onClose={() => setSnackbarMsg({msg: "", severity: "success"})}
                >
                    {snackbarMsg.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default VisitsPage;

export const loader = async () => {
    const loaderUsers = await fetchUsers();
    const loaderVisits = await fetchVisits();
    return {loaderUsers, loaderVisits};
}