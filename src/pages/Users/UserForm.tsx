import React from "react";
import {Divider, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch, TextField} from "@mui/material";
import {DrawerPanelActions} from "../../components/DrawerPanel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {AddEditUserRequest} from "../../api/users";
import {GenericErrorResponse} from "../../utils/errorHelper";

type UserFormProps = {
    type: DrawerPanelActions | string;
    userData: AddEditUserRequest;
    handleFormChange: (key: keyof AddEditUserRequest, value: any) => void;
    errors: GenericErrorResponse;
}

const UserForm: React.FC<UserFormProps> = ({type, userData, handleFormChange, errors}) => {
    const [showPassword, setShowPassword] = React.useState(false);

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
                    label="Password"
                    required={type !== DrawerPanelActions.Edit}
                />
                <FormHelperText>
                    {errors.password}
                </FormHelperText>
            </FormControl>
        </React.Fragment>
    );
}

export default UserForm;