import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";

import CameraCapture from "../Camera";
import axios from "axios";

import { v4 as uuid } from "uuid";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_AWS_API_GATEWAY;
  const name = location.state?.params?.username;

  const [disableSignUp, setDisableSignUp] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState(name);
  const [photo, setPhoto] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const setImage = (image) => {
    if (image) {
      setPhoto(image);
      setDisableSignUp(false);
    } else {
      setPhoto("");
      setDisableSignUp(true);
    }
  };

  const handleLogin = async () => {
    try {
      setShowSpinner(true);
      const body = {
        key: `${username}.png`,
        username,
        target: photo,
      };
      const response = await axios.post(`${baseURL}/verify`, body);
      if (JSON.parse(response.data.body).verification) {
        setSuccess(true);
        setShowSpinner(false);
        const unique_id = uuid();
        window.sessionStorage.setItem("token", unique_id);
        window.sessionStorage.setItem("expiresIn", 60);
        window.sessionStorage.setItem("timestamp", Date.now());
        setTimeout(() => {
          navigate("/access");
        }, 3000);
      } else {
        setShowSpinner(false);
        setError(true);
      }
    } catch (error) {
      setShowSpinner(false);
      setError(true);
      console.error("API Error:", error);
    }
  };

  return (
    <>
      {showSpinner && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Container
        maxWidth="lg"
        sx={{
          padding: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {success && (
            <>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircleIcon
                  style={{ height: "200px", width: "200px", color: "green" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{
                    paddingTop: "3%",
                    paddingBottom: "3%",
                  }}
                  className="header-font"
                >
                  Access granted
                </Typography>
              </Grid>
            </>
          )}
          {!success && !error && (
            <>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Typography
                  style={{
                    paddingTop: "3%",
                    paddingBottom: "3%",
                  }}
                  className="header-font"
                >
                  One more step...
                </Typography>
                <Typography
                  style={{
                    paddingTop: "3%",
                    paddingBottom: "7%",
                  }}
                  className="body-font"
                >
                  You're already registered to access the resources. Enter your
                  username and verify your identity through facial verification
                  to access.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={handleUsernameChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={disableSignUp}
                        fullWidth
                        className={
                          disableSignUp ? "btn-color-disabled" : "btn-color"
                        }
                      >
                        Login
                      </Button>
                    </>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={0} sm={0} md={7} lg={7}>
                <CameraCapture image={setImage} />
              </Grid>
            </>
          )}
          {!success && error && (
            <>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ErrorIcon
                  style={{ height: "200px", width: "200px", color: "red" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{
                    paddingTop: "3%",
                    paddingBottom: "3%",
                  }}
                  className="header-font"
                >
                  Identity not verified
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/")}
                  fullWidth
                  className="btn-color"
                >
                  Login
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Login;
