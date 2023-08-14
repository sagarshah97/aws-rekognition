import { useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CssBaseline,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import graph1 from "../../assets/graph1.jpg";
import graph2 from "../../assets/graph2.jpg";
import checkTokenExpiry from "../../utils/checkTokenExpiry";

const styles = {
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
  },
  paper: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  figure: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    textAlign: "center",
  },
  graphImage: {
    width: "100%",
    height: "310px",
  },
};

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkTokenExpiry()) {
      navigate("/");
    }
  });

  const logout = () => {
    console.log("Logged out!!");
    window.sessionStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.root}>
      <CssBaseline />
      <main style={styles.content}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                className="header-font"
                style={{
                  paddingTop: "2%",
                  paddingBottom: "1%",
                  paddingLeft: "2%",
                }}
              >
                Dashboard
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={logout}
                className="btn-color"
              >
                Logout
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Paper style={styles.paper}>
                <Typography variant="h6" className="title-font">
                  Stats
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                    <Paper
                      style={styles.paper}
                      sx={{
                        backgroundColor: "#cce6ff",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={styles.figure}
                        className="sub-header-font"
                      >
                        1000
                      </Typography>
                      <Typography
                        variant="body1"
                        style={styles.description}
                        className="body-font"
                      >
                        Total Users
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                    <Paper
                      style={styles.paper}
                      sx={{
                        backgroundColor: "#ffd9b3",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={styles.figure}
                        className="sub-header-font"
                      >
                        500
                      </Typography>
                      <Typography
                        variant="body1"
                        style={styles.description}
                        className="body-font"
                      >
                        Total Orders
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                    <Paper
                      style={styles.paper}
                      sx={{
                        backgroundColor: "#d6f5d6",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={styles.figure}
                        className="sub-header-font"
                      >
                        $10,000
                      </Typography>
                      <Typography
                        variant="body1"
                        style={styles.description}
                        className="body-font"
                      >
                        Revenue
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                    <Paper
                      style={styles.paper}
                      sx={{
                        backgroundColor: "#d9ffb3",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={styles.figure}
                        className="sub-header-font"
                      >
                        80%
                      </Typography>
                      <Typography
                        variant="body1"
                        style={styles.description}
                        className="body-font"
                      >
                        Conversion Rate
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={styles.paper}>
                <Typography variant="h6" className="title-font">
                  Sales
                </Typography>
                <img src={graph1} alt="Graph 1" style={styles.graphImage} />
                <div
                  style={{
                    fontFamily: "NeoSansStdLight",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  <a href="https://www.freepik.com/free-vector/illustration-data-analysis-graph_2808061.htm#query=sales%20graph&position=1&from_view=search&track=ais">
                    Image by rawpixel.com
                  </a>{" "}
                  on Freepik
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={styles.paper}>
                <Typography variant="h6" className="title-font">
                  Profits
                </Typography>
                <img src={graph2} alt="Graph 2" style={styles.graphImage} />
                <div
                  style={{
                    fontFamily: "NeoSansStdLight",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  <a href="https://www.freepik.com/free-vector/illustration-data-analysis-graph_2808057.htm#query=sales%20graph&position=0&from_view=search&track=ais">
                    Image by rawpixel.com
                  </a>{" "}
                  on Freepik
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
