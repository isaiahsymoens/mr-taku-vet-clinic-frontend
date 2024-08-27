import {Box, Grid, Typography, Button} from "@mui/material";

const Profile = () => {
    return (
        <Box>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3} gap={1}>
                    <Grid item 
                        xs={3.5} 
                        sx={{
                            paddingY: 6,
                            boxShadow: 3
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <img src="https://cdn.pixabay.com/photo/2024/03/16/20/35/ai-generated-8637800_1280.jpg"
                                height={150}
                                style={{
                                    width: "100%",
                                    maxWidth: "150px",
                                    borderRadius: "10em"
                                }}
                            />
                            <Box sx={{ paddingY: 2 }}>
                                <Typography variant="subtitle2">Monkey D. Luffy</Typography>
                                <Typography variant="body2" sx={{ paddingBottom: 1.5 }}>monkeydluffy@gmail.com</Typography>
                                <Button variant="contained">Edit Profile</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item 
                        xs={7.5}
                        sx={{
                            boxShadow: 3
                        }}
                    >
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Profile;