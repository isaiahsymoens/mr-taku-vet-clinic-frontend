import React from "react";
import {Box} from "@mui/material";
import SubHeader from "../../components/SubHeader";
import CustomTable from "../../components/CustomTable";

const UsersPage: React.FC = () => {
    return (
        <React.Fragment>
            <SubHeader text="Users" showSearchbar={true} btnText="Add User" />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomTable />
            </Box>
        </React.Fragment>
    );
}

export default UsersPage;