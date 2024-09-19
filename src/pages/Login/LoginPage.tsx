import {useState} from "react";
import {Box, Typography, TextField, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {GenericErrorResponse} from "../../utils/errorHelper";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {loginUser} from "../../api/users";

export interface LoginDetails {
    username: string;
    password: string;
}

const initialState: LoginDetails = {username: "", password: ""}

const LoginPage: React.FC = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<GenericErrorResponse>({});

    const navigate = useNavigate();

    
    const handleFormChange = (key: keyof LoginDetails, value: any) => {
        setLoginDetails((prevData) => ({...prevData, [key]: value}));
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await loginUser(loginDetails);
            navigate("/users");
        } catch (err) {
            setErrors(err as GenericErrorResponse);
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const hasError = (field: string) => field in errors;
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return <Box sx={{width: "100vw", height: "100vh", background: "#ebebeb"}}>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh"
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: "400px",
                height: "300px",
                boxShadow: "10px",
                background: "#FFF",
                margin: {xs: "0 10px", sm: "0"},
                borderRadius: {xs: ".5em", sm: "0"}
            }}>
                <Box sx={{
                    background: "#3771d0",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: {xs: ".5em", sm: "0"},
                    borderTopRightRadius: {xs: ".5em", sm: "0"}
                }}>
                    <Typography variant="h2" sx={{ fontSize: "1.7rem", color: "#FFF", fontWeight: "700" }}>
                        <span style={{ fontWeight: "100" }}>Mr. Taku</span>VET Clinic
                    </Typography>
                </Box>  
                <form 
                    onSubmit={handleLogin}
                    style={{
                        maxWidth: "85%",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto",
                        gap: "20px",
                        marginTop: "30px"
                    }}
                >
                    <TextField 
                        label="Username" 
                        variant="outlined" 
                        value={loginDetails.username}
                        error={hasError("username")}
                        helperText={errors.username}
                        onChange={(e) => handleFormChange("username", e.target.value)}
                        size="small" 
                        required
                    />
                    <FormControl variant="outlined" size="small" error={hasError("password")}>
                        <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={loginDetails.password} 
                            onChange={(e) => handleFormChange("password", e.target.value)}  
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            required
                        />
                        <FormHelperText>
                            {errors.password}
                        </FormHelperText>
                    </FormControl>
                    <Button 
                        type="submit"
                        variant="contained"
                    >Login</Button>
                </form>
            </Box>
        </Box>
    </Box>
}

export default LoginPage;