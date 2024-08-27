import {Box, Typography, Paper, InputBase, IconButton, Button} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type SubHeaderProps = {
    text: string;
    showSearchbar?: boolean;
    btnText: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({text, showSearchbar=false, btnText}) => {
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
                            sx={{ ml: 1, flex: 1, fontSize: "1rem" }}
                            placeholder="Search.."/>
                        <IconButton type="button">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                }
                <Button variant="contained">{btnText}</Button>
            </Box>
        </Box>
    );
}

export default SubHeader;