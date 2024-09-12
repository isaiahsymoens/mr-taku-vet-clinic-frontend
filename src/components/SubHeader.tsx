import React, {useState} from "react";
import {Box, Typography, Paper, InputBase, IconButton, Button, Menu, MenuItem} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';

type SubHeaderProps = {
    text: string;
    btnText: string;
    toggleDrawer?: () => void;
    showSearchbar?: boolean;
    onSearch?: (searchText: string) => void;
    showFilter?: boolean;
    filterMenuItems?: React.ReactNode;
}

const SubHeader: React.FC<SubHeaderProps> = ({
    text, 
    showSearchbar=false, 
    btnText, 
    toggleDrawer, 
    onSearch,
    showFilter,
    filterMenuItems
}) => {
    const [searchInput, setSearchInput] = useState("");
    const [showSearchReset, setShowSearchReset] = useState(false);

    const [anchorE1, setAchorE1] = useState<null | HTMLElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setShowSearchReset(false);
        if (e.target.value === "") {
            handleClearSearch();
        }
    }

    const handleSearch = () => {
        if (onSearch && searchInput !== "") {
            onSearch(searchInput);
            setShowSearchReset(true);
        }
    }

    const handleClearSearch = () => {
        if (onSearch) {
            setSearchInput(() => {
                onSearch("");
                setSearchInput("");
                return "";
            });
            setShowSearchReset(false);
        }
    }

    return (
        <Box sx={{ 
            background: "#F5F5F5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: "20px",
            paddingY: "10px",
            marginTop: "48px" 
        }}>
            <Typography variant="h6">{text}</Typography>
            <Box sx={{display: "flex", gap: "10px", height: 36.5}}>
                {showFilter &&
                    <React.Fragment>
                        <IconButton 
                            type="button" 
                            onClick={(e: React.MouseEvent<HTMLElement>) => setAchorE1(e.currentTarget)}
                        >
                            {showSearchReset ? <CloseIcon /> : <TuneIcon />}
                        </IconButton>
                        <Menu
                            anchorEl={anchorE1}
                            open={Boolean(anchorE1)}
                            onClose={() => setAchorE1(null)}
                        >
                            {filterMenuItems}
                        </Menu>
                    </React.Fragment>
                }
                {showSearchbar && 
                    <Paper component="form" 
                        sx={{  
                            display: "flex", 
                            alignItems: "center", 
                            width: 300
                        }}
                    >
                        <IconButton 
                            type="button" 
                            onClick={showSearchReset ? handleClearSearch : handleSearch}
                        >
                            {showSearchReset ? <CloseIcon /> : <SearchIcon />}
                        </IconButton>
                        <InputBase
                            sx={{flex: 1, fontSize: "1rem", ml: 1}}
                            placeholder="Search.."
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                    </Paper>
                }
                <Button 
                    variant="contained"
                    onClick={toggleDrawer} 
                    sx={{minWidth: "108px"}}>{btnText}</Button>
            </Box>
        </Box>
    );
}

export default SubHeader;