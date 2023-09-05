import React, { useContext, useState } from 'react';
import { Button, CircularProgress, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import client from '../../global/client';
import CustomAlert from '../../Component/Alert';
import { AlertContext } from '../../context';

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email('Oops, Invalid email, Try again').required('Please input your email!'),
});

const Forgot = ({ changeStat }) => {
  const [sentEmail, setSentEmail] = useState(false);
  const { setDataAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ForgotSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { email } = data;

    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/auth/forgotPassword`,
      data: { email },
      isLogin: true,
    });

    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: res.meta.message
      });
      setSentEmail(true);
      reset();
      setIsLoading(false);
    } else {
      setDataAlert({
        severity: 'error',
        open: true,
        message: res.error.detail
      })
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setSentEmail(false);
  };

  return (
    <>
    <CustomAlert />
    <Grid container paddingTop={22}>
      {sentEmail ? (
        <Grid spacing={2} sx={{ textAlign: 'center' }}>
          <Grid item xs={12}>
            <Typography variant='body2'>Verify Your Email 📧</Typography>
          </Grid>
          <Grid item xs={12} paddingTop={2}>
            <Typography variant='body4'>Boom! We've sent an activation link to your email at employee@mail.com. Just click it and let the magic begin!</Typography>
          </Grid>
          <Grid item xs={12} paddingTop={2}>
            <Typography variant='body4'>Didn't get the mail?  <span style={{ cursor: 'pointer', color: '#0078D7' }} onClick={handleResend}>Resend</span></Typography>
          </Grid>
        </Grid>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            <Typography variant='body2'>Forget Password 🔒</Typography>
          </Grid>
          <Grid item xs={12} paddingTop={2}>
            <Typography variant='body4'>Forgot your password? We've got you covered! Just give us your email and we'll send a reset link straight to your inbox. Easy-peasy!</Typography>
          </Grid>
          <Grid item xs={12} paddingBottom={2} paddingTop={4}>
            <TextField
              label="Email"
              fullWidth
              placeholder="Input your email"
              {...register('email')}
              error={errors.email !== undefined}
              helperText={errors.email ? errors.email.message : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} paddingTop={4}>
            <Button variant="contained" type="submit" fullWidth disabled={isLoading} >
            {isLoading ? (
              <>
                <CircularProgress size={16} color="inherit" />
                <Typography marginLeft={1}>Loading...</Typography>
              </>
            ) : (
              "SEND"
            )}
            </Button>
          </Grid>
        </form>
      )}

      <Grid item xs={12} padding={2}>
        <Divider />
      </Grid>
      <Grid item xs={12} textAlign="center" display="flex" alignItems="center" justifyContent="center">
        <ArrowBackIosNewIcon style={{ color: "#0078D7", fontSize: '18px', paddingRight: '14px' }} />
        <Typography style={{ cursor: 'pointer' }} variant='primaryText' onClick={() => changeStat('login')}>BACK TO LOG IN</Typography>
      </Grid>
    </Grid>
    </>
  );
};

export default Forgot;
