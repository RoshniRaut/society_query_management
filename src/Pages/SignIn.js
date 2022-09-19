import React, { useState} from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth'
import {admin, auth} from '../firebase'
import { Box, Button, Container, Grid, TextField, Typography,Alert, CircularProgress } from '@mui/material';

import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")

  const [error,setError]= useState()
  const [success]= useState()
  const [loading,setLoading]= useState(false)
  
  const color="#645CAA"
  const nav=useNavigate();

  const Login=async(e)=>{
    e.preventDefault();
    setLoading(true)
    setError("")
    try{
      await signInWithEmailAndPassword(auth,email,pass).then((userCredential)=>{
        if(userCredential.user.email===admin){
          nav("/admin-dashboard")
        }else{
          nav("/customer-dashboard")
        }
      })
    }catch(error){
      setError(error.code+": "+error.message)
    }
    setLoading(false)
  }
  return (loading?<Container sx={{display:'flex',justifyContent:'center', alignItems:'center',height:'100vh'}}>
  <CircularProgress />
</Container>:
    <div>
    <Container component="main" maxWidth="xs">
      <Box sx={{marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>

            <Typography component="h1" variant="h5">
              Login
              </Typography> 
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <Box component="form" onSubmit={Login} sx={{mt:3}} >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                  <TextField fullWidth label="Email address" type="email" onChange={(e)=>setEmail(e.target.value)} required/>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <TextField fullWidth label="Password" type="password" onChange={(e)=>setPass(e.target.value)} autoComplete="off" required/>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button fullWidth disabled={loading} type="submit"  style={{backgroundColor:color}} variant="contained" >Login</Button>
                  </Grid>
                  {/*
                  <Grid item xs={12} sm={12}>
                    <Button fullWidth disabled={loading} style={{backgroundColor:color}} onClick={onGoogleSignIn} variant="contained"><GoogleIcon/> Google</Button>
                  </Grid>
                  */}
                </Grid>
              </Box>
            </Box>
    </Container>
  </div>
  )
}
