import React, { useState } from 'react';
import { Button, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import client from '../../global/client';

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email('Oops, Invalid email, Try again').required('Please input your email!'),
});

const Forgot = ({ changeStat }) => {
  const [sentEmail, setSentEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ForgotSchema),
  });

  const onSubmit = async (data) => {
    const { email } = data;
    console.log({email});

    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/auth/forgotPassword`,
      data: { email },
      isLogin: true,
    });

    if (!res.isError) {
      setSentEmail(true);
      reset();
    }
  };

  const handleResend = () => {
    setSentEmail(false);
  };

  return (
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
            <Button variant="primaryButton" type="submit" fullWidth>
              SEND
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
  );
};

export default Forgot;
