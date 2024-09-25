import React, {useEffect, useState} from "react";
import {Box, Typography, Paper, InputBase, IconButton, Button, Menu} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import {RootState} from "../redux";
import {useDispatch, useSelector} from "react-redux";
import {visitActions} from "../redux/features/visit";

type SubHeaderProps = {
    text: string;
    btnText: string;
    toggleDrawer?: () => void;
    showSearchbar?: boolean;
    onSearch?: (searchText: string) => void;
    filterMenuItems?: React.ReactNode;
    resetSearch?: () => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
    text, 
    showSearchbar=false, 
    btnText, 
    toggleDrawer, 
    onSearch,
    filterMenuItems,
    resetSearch
}) => {
    const [searchInput, setSearchInput] = useState("");
    const [showSearchReset, setShowSearchReset] = useState(false);

    const [anchorE1, setAchorE1] = useState<null | HTMLElement>(null);

    const dispatch = useDispatch();
    const closeFilter = useSelector((state: RootState) => state.visit.closeFilter);
    const resetFilter = useSelector((state: RootState) => state.visit.resetFilter);

    useEffect(() => {
        if (closeFilter) {
            setAchorE1(null);
            dispatch(visitActions.setCloseFilter(false));

        }
    }, [closeFilter]);

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
                {filterMenuItems &&
                    <React.Fragment>
                        {resetFilter && 
                            <IconButton 
                                type="button" 
                                onClick={resetSearch}
                            >
                                <RestartAltIcon />
                            </IconButton>
                        }
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
                            sx={{mt: 1}}
                        >
                            <IconButton 
                                onClick={() => setAchorE1(null)}
                                sx={{position: "absolute", top: 0, right: 0}}>
                                <HighlightOffOutlinedIcon />
                            </IconButton>
                            {filterMenuItems}
                        </Menu>
                    </React.Fragment>
                }
                {showSearchbar && 
                    <Paper 
                        component="form" 
                        sx={{  
                            display: "flex", 
                            alignItems: "center", 
                            width: 300
                        }}
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        <IconButton 
                            type="submit" 
                            onClick={showSearchReset ? handleClearSearch : handleSearch}
                        >
                            {showSearchReset ? <CloseIcon /> : <SearchIcon />}
                        </IconButton>
                        <InputBase
                            sx={{flex: 1, fontSize: "1rem", ml: 1, pr: 1.5}}
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