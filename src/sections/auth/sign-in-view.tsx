import type { AppDispatch, RootState } from 'src/store';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Alert } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { userLogin } from 'src/features/auth/authActions';

import { Iconify } from 'src/components/iconify';

export function SignInView() {
  const router = useRouter();
  const { loading, userInfo, error } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [router, userInfo])

  // Handle form submission
  const submitForm = (data: any) => dispatch(userLogin(data));

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
        {error && <Alert variant="outlined" severity='error' sx={{ width: '100%' }}>{error}</Alert>}
      </Box>
  
      <form onSubmit={handleSubmit(submitForm)}>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <TextField
            fullWidth
            type='email'
            label="Email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message as string || ''}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />

          <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
            Forgot password?
          </Link>

          <TextField
            fullWidth
            label="Password"
            InputLabelProps={{ shrink: true }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message as string || ''}
            sx={{ mb: 3 }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            loading={loading}
            disabled={loading}
            // onClick={handleSignIn}
          >
            Sign in
          </LoadingButton>
        </Box>
      </form>

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}
