import {
  Button,
  InputAdornment,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useContext } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import client from "../../global/client";
import { AlertContext } from "../../context";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const Reset = ({ open, onClose }) => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isChange, setIsChange] = useState(false);
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const [loading, setLoading] = useState(false);
  const { setDataAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const textPlease = "Please Input";
  const Schemareset = Yup.object().shape({
    password: Yup.string()
      .required(`${textPlease} Current Password`)
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& #^_\-+=()<>,./|\[\]{}~])[A-Za-z\d@$!%*?& #^_\-+=()<>,./|\[\]{}~]*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    newPassword: Yup.string()
      .required(`${textPlease} New Password`)
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& #^_\-+=()<>,./|\[\]{}~])[A-Za-z\d@$!%*?& #^_\-+=()<>,./|\[\]{}~]*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirmPassword: Yup.string()
      .required(`${textPlease} Confirm Password`)
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Looks like your new password and confirmation password aren't on the same page"
      )
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& #^_\-+=()<>,./|\[\]{}~])[A-Za-z\d@$!%*?& #^_\-+=()<>,./|\[\]{}~]*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(Schemareset),
    mode: "onChange",
  });

  const handleReset = async () => {
    const dataPassword = {
      password: watchPassword,
      newPassword: watchNewPassword,
      confirmPassword: watchConfirmPassword,
    };
    setLoading(true);
    const res = await client.requestAPI({
      method: "POST",
      endpoint: `/auth/changePassword`,
      data: dataPassword,
    });
    if (res.isError) {
      setDataAlert({
        severity: "error",
        open: true,
        message: res.error.meta.message,
      });
      setLoading(false);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshtoken");
      setDataAlert({
        severity: "success",
        open: true,
        message: res.meta.message,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const watchPassword = watch("password", "");
  const watchNewPassword = watch("newPassword", "");
  const watchConfirmPassword = watch("confirmPassword", "");

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete"
      >
        <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
          {"Change Password"}
        </DialogTitle>
        <DialogContent className="dialog-delete-content">
          <DialogContentText>
            Easily update your password and enchance your account security
          </DialogContentText>
        </DialogContent>

        <DialogContent>
          <form onSubmit={handleSubmit(handleReset)}>
            <Grid item xs={12} paddingBottom={2} paddingTop={1}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Current Password*"
                    fullWidth
                    {...field}
                    placeholder="Input your password"
                    type={showCurrentPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showCurrentPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} paddingBottom={2} paddingTop={1}>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="New Password*"
                    fullWidth
                    {...field}
                    placeholder="Input your password"
                    type={showNewPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showNewPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.newPassword}
                    helperText={
                      errors.newPassword ? errors.newPassword.message : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} paddingBottom={2} paddingTop={1}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Confirm New Password*"
                    fullWidth
                    {...field}
                    placeholder="Input your password"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.confirmPassword || !!errors.notMatch}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            <DialogActions className="dialog-delete-actions">
              <Button
                onClick={handleClose}
                variant="outlined"
                className="button-text"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="button-text"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size="14px"
                      color="inherit"
                      sx={{ marginRight: "4px" }}
                    />
                    {"Loading..."}
                  </>
                ) : (
                  "Save Data"
                )}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Reset;
