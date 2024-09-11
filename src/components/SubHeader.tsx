import {Box, Typography, Paper, InputBase, IconButton, Button} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";

type SubHeaderProps = {
    text: string;
    showSearchbar?: boolean;
    btnText: string;
    toggleDrawer?: () => void;
    onSearch?: (searchText: string) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({text, showSearchbar=false, btnText, toggleDrawer, onSearch}) => {
    const [searchInput, setSearchInput] = useState("");
    const [showSearchReset, setShowSearchReset] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchInput);
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
            <Box sx={{ display: "flex", gap: "10px" }}>
                {showSearchbar && 
                    <Paper component="form" 
                        sx={{  
                            display: "flex", 
                            alignItems: "center", 
                            width: 300,
                            height: 36.5
                        }}
                    >
                        <InputBase
                            sx={{flex: 1, fontSize: "1rem", ml: 1}}
                            placeholder="Search.."
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                        <IconButton type="button" onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                }
                <Button 
                    variant="contained"
                    onClick={toggleDrawer} 
                    sx={{ minWidth: "108px" }}>{btnText}</Button>
            </Box>
        </Box>
    );
}

export default SubHeader;