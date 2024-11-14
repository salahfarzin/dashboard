import { createAsyncThunk } from "@reduxjs/toolkit"

interface LoginCredentials {
    email: string
    password: string
}

interface LoginResponse {
    token_type: string
    expires_in: number
    access_token: string
}

export const userLogin = createAsyncThunk<LoginResponse, LoginCredentials>(
    'auth/login',
    async ({ email , password }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        const res = await fetch(`${process.env.API_URL}/token`, {
            headers: {
              'Accept': 'application/json',
            },
            method: 'POST',
            body: formData,
            mode: 'cors',
            credentials: "include", 
        });
        
        if (res.ok){
            const data = await res.json();
            localStorage.setItem('userToken', data.return.access_token)

            return data.return
        }
        
        // If the response is not ok, handle the error
        const error = await res.json();
        return rejectWithValue(Object.values(error.errors).join('\n') || 'Login failed');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
      }
    }
  )