import React, {useState} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type CustomTableRowMenuProps = {
    menu: any;
    test: any[] | any | Object;
}

const CustomTableRowMenu: React.FC<CustomTableRowMenuProps> = ({menu, test}) => {
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
                {menu.map((e: any, index: number) => 
                    <MenuItem 
                        key={index}
                        onClick={
                            () => {
                            e.execute(test); 
                            handelOnClose()}
                        }
                    >
                        {e.name}
                    </MenuItem>
                )}
            </Menu>
        </React.Fragment>
    );
}

export default CustomTableRowMenu;