import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import landing from "../../assets/landing.jpeg";
import CameraCapture from "../Camera";

const Landing = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_AWS_API_GATEWAY;

  const [registerUser, setRegisterUser] = useState(false);
  const [disableSignUp, setDisableSignUp] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setShowSpinner(true);
      const response = await axios.post(`${baseURL}/check`, { username });
      console.log(JSON.parse(response.data.body)); //todo: delete later
      if (JSON.parse(response.data.body)) {
        setShowSpinner(false);
        setRegisterUser(false);
        const params = { username };

        navigate("/login", { state: { params } });
      } else {
        setShowSpinner(false);
        setRegisterUser(true);
      }
    } catch (error) {
      setShowSpinner(false);
      console.error("API Error:", error);
    }
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

  const handleUpload = async () => {
    try {
      setShowSpinner(true);
      const body = {
        key: `${username}.png`,
        username,
        image: photo,
      };
      console.log(body); //todo: delete later
      const response = await axios.post(`${baseURL}/upload`, body);
      console.log(JSON.parse(response.data.body));
      if (JSON.parse(response.data.body).includes("success")) {
        setShowSpinner(false);
        const params = { username };
        navigate("/login", { state: { params } });
      }
    } catch (error) {
      setShowSpinner(false);
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
          <Grid item xs={12} sm={12} md={5} lg={5}>
            {!registerUser ? (
              <>
                <Typography
                  style={{
                    paddingTop: "3%",
                    paddingBottom: "3%",
                  }}
                  className="header-font"
                >
                  Secure Access
                </Typography>
                <Typography
                  style={{
                    paddingTop: "3%",
                    paddingBottom: "7%",
                  }}
                  className="body-font"
                >
                  Enter your username and verify your identity through facial
                  verification to access the resources.
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  style={{
                    paddingTop: "3%",
                    paddingBottom: "3%",
                  }}
                  className="header-font"
                >
                  Let's sign you up!
                </Typography>
                <Typography
                  style={{
                    paddingTop: "3%",
                    paddingBottom: "7%",
                  }}
                  className="body-font"
                >
                  Enter your username which will be used to identify you and
                  then capture an image and submit it.
                </Typography>
              </>
            )}
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
                {!registerUser ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      fullWidth
                      className="btn-color"
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpload}
                      disabled={disableSignUp}
                      fullWidth
                      className={
                        disableSignUp ? "btn-color-disabled" : "btn-color"
                      }
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={0} sm={0} md={7} lg={7}>
            {!registerUser ? (
              <>
                <img
                  src={landing}
                  alt="image"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
                <div
                  style={{
                    fontFamily: "NeoSansStdLight",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  <a href="https://www.freepik.com/free-vector/face-recognition-data-safety-mobile-phone-users-getting-access-data-after-biometrical-checking-verification-personal-id-access-identification-concept_10606444.htm#query=face%20id&position=3&from_view=search&track=ais">
                    Image by pch.vector
                  </a>{" "}
                  on Freepik
                </div>
              </>
            ) : (
              <>
                <CameraCapture image={setImage} />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Landing;
