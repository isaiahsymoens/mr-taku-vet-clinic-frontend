import React from "react";
import {Box} from "@mui/material";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";

const UsersPage: React.FC = () => {
    const tableData = {
        tableHeaders: [
            {label: "Name", field: "name"},
            {label: "Email", field: "email"},
            {label: "Pet Owned", field: "petOwned"},
            {label: "", field: ""}
        ],
        tableBody: [
            {email: "test@gmail.com", name: "Test test", petOwned: 0},
            {email: "test1@gmail.com", name: "Test test 1", petOwned: 1},
            {email: "test2@gmail.com", name: "Test test 2", petOwned: 2},
            {email: "test@gmail.com", name: "Test test", petOwned: 0},
            {email: "test1@gmail.com", name: "Test test 1", petOwned: 1},
            {email: "test2@gmail.com", name: "Test test 2", petOwned: 2},
            {email: "test@gmail.com", name: "Test test", petOwned: 0},
            {email: "test1@gmail.com", name: "Test test 1", petOwned: 1},
            {email: "test2@gmail.com", name: "Test test 2", petOwned: 2},
        ],
    }

    return (
        <React.Fragment>
            <SubHeader text="Users" showSearchbar={true} btnText="Add User" />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomTable tableHeaders={tableData.tableHeaders} tableBody={tableData.tableBody}/>
            </Box>
        </React.Fragment>
    );
}

export default UsersPage;