import React, {useState} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type CustomTableRowMenuProps = {
    onEditRow: (e: any[]) => void;
    onViewRow: (e: any) => void;
    onDeleteRow: (e: any) => void;
    test: any[] | any | Object;
}


const CustomTableRowMenu: React.FC<CustomTableRowMenuProps> = ({onEditRow, onViewRow, onDeleteRow, test}) => {
    const [anchorE1, setAchorE1] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAchorE1(e.currentTarget);
    }

    const handelOnClose = () => {
        setAchorE1(null);
    }

    return (
        <React.Fragment>
            <IconButton 
                aria-controls="row-menu"
                aria-haspopup="true" 
                size="small"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="row-menu"
                anchorEl={anchorE1}
                keepMounted
                open={Boolean(anchorE1)}
                onClose={handelOnClose}
            >
                <MenuItem onClick={() => {onEditRow(test); handelOnClose()}}>Edit</MenuItem>
                <MenuItem onClick={() => onViewRow(test)}>View</MenuItem>
                <MenuItem onClick={() => onDeleteRow(test)}>Delete</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default CustomTableRowMenu;