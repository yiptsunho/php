import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginContext } from '../App'
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from 'react';
import CustomDialog from '../components/CustomDialog';
import { login } from '../apis/UserApi'
import Restaurant from '@mui/icons-material/RestaurantOutlined';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function Login(props) {

    const { isLogin, setIsLogin, refreshToken } = useContext(LoginContext);
    const navigate = useNavigate()
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('Login failed')
    const dialogContent = useRef('Email or password incorrect')
    const [idValid, setIdValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)

    const handleChangeusername = (val) => {
        setusername(val)
    }

    const handleChangePassword = (val) => {
        setPassword(val)
    }

    const handleSubmit = (event) => {

        event.preventDefault()
        const params = {
            username: username,
            password: password
        }

        const { isValid, errMsg } = validation(params)
        // TODO:  connect to real db
        // if (params.username === 'admin' && params.password === '123456') {
        //     setIsLogin(true)
        //     navigate('/landing/dashboard')
        // }
        if (isValid) {
            login(params, setIsLogin, navigate, setOpenDialog, dialogTitle, dialogContent)
        } else {
            dialogTitle.current = "Warning"
            dialogContent.current = errMsg
        }
    };

    const validation = (params) => {
        let isValid = true
        let errMsg

        const { username, password } = params;

        if (!username) {
            setIdValid(false)
            isValid = false
            errMsg = "Please input all mandatory fields"
        }
        if (!password) {
            setPasswordValid(false)
            isValid = false
            errMsg = "Please input all mandatory fields"
        }

        return { isValid, errMsg }
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <form onSubmit={handleSubmit} style={{ display: "Contents" }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <Restaurant />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                error={!idValid}
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                value={username}
                                helperText={!idValid ? "Username is mandatory" : ""}
                                onChange={(e) => handleChangeusername(e.target.value)}
                            />
                            <TextField
                                error={!passwordValid}
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                helperText={!passwordValid ? "Password is mandatory" : ""}
                                onChange={(e) => handleChangePassword(e.target.value)}
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="/forgotpassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/createnewaccount" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid> */}
                            <CustomDialog
                                open={openDialog}
                                setOpen={setOpenDialog}
                                title={dialogTitle.current}
                                content={dialogContent.current}
                            />
                        </Box>
                    </form>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

export default Login;