import React, {useState} from "react";
import {Box, Button, Divider, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch, TextField} from "@mui/material";
import {DrawerPanelActions} from "../../components/DrawerPanel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HideSourceIcon from "@mui/icons-material/HideSource";
import {AddEditUserRequest} from "../../api/users";
import {GenericErrorResponse} from "../../utils/errorHelper";

type UserFormProps = {
    type: DrawerPanelActions | string;
    userData: AddEditUserRequest;
    handleFormChange: (key: keyof AddEditUserRequest, value: any) => void;
    onShowNewPassword: (e: boolean) => void;
    showNewPassword: boolean;
    errors: GenericErrorResponse;
}

const UserForm: React.FC<UserFormProps> = ({type, userData, handleFormChange, onShowNewPassword, showNewPassword, errors}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const hasError = (field: string) => field in errors;
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <TextField 
                label="First Name" 
                type="text"
                name="firstName"
                variant="outlined" 
                value={userData.firstName}
                error={hasError("firstName")}
                helperText={errors.firstName}
                onChange={(e) => handleFormChange("firstName", e.target.value)} 
                size="small" 
                fullWidth 
                required
            />
            <TextField 
                label="Middle Name" 
                type="text"
                name="middleName"
                variant="outlined" 
                value={userData.middleName}
                error={hasError("middleName")}
                helperText={errors.middleName}
                onChange={(e) => handleFormChange("middleName", e.target.value)}  
                size="small" 
                fullWidth 
            />
            <TextField 
                label="Last Name" 
                type="text"
                name="lastName"
                variant="outlined" 
                value={userData.lastName} 
                error={hasError("lastName")}
                helperText={errors.lastName}
                onChange={(e) => handleFormChange("lastName", e.target.value)} 
                size="small" 
                fullWidth 
                required
            />
            <TextField 
                label="Email" 
                type="email"
                name="email"
                variant="outlined" 
                value={userData.email}
                error={hasError("email")}
                helperText={errors.email}
                onChange={(e) => handleFormChange("email", e.target.value)}  
                size="small" 
                fullWidth 
                required
            />
            <FormControlLabel
                label="Active"
                control={<Switch name="active" checked={userData.active} onChange={(e) => handleFormChange("active", e.target.checked)} />}
            />
            <Divider />
            <TextField 
                label="Username"
                type="text" 
                name="username"
                variant="outlined" 
                value={userData.username}  
                error={hasError("username")}
                helperText={errors.username} 
                onChange={(e) => handleFormChange("username", e.target.value)}  
                size="small" 
                fullWidth 
                required
            />
            {type === DrawerPanelActions.Add &&
                <FormControl variant="outlined" size="small" error={hasError("password")}>
                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={userData.password} 
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
                        label={"Password"}
                        required
                    />
                    <FormHelperText>
                        {errors.password}
                    </FormHelperText>
                </FormControl>
            }
            {type === DrawerPanelActions.Edit &&
                <React.Fragment>
                    {!showNewPassword && <Button variant="outlined" onClick={() => onShowNewPassword(true)}>Change Password</Button>}
                    {showNewPassword &&
                        <Box sx={{display: "flex", alignItems: "flex-start", gap: 1}}>
                            <IconButton sx={{color: "#1976D2"}} onClick={() => onShowNewPassword(false)}><HideSourceIcon /></IconButton>
                            <FormControl variant="outlined" size="small" sx={{width: "100%"}} error={hasError("password")}>
                                <InputLabel htmlFor="outlined-adornment-password">New Password *</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={userData.password} 
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
                                    label={"New Password"}
                                    required
                                />
                                <FormHelperText>
                                    {errors.password}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                    }
                    
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default UserForm;