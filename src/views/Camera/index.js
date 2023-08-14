import { useRef, useState } from "react";
import { Button, Container, Paper, Grid } from "@mui/material";
import faceId from "../../assets/face-id.png";

const CameraCapture = ({ image }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [streamStarted, setStreamStarted] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");

  const [disableStartBtn, setDisableStartBtn] = useState(false);
  const [disableCaptureBtn, setDisableCaptureBtn] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [startBtnLabel, setStartBtnLabel] = useState("Start Camera");

  const startCamera = async () => {
    image("");
    setCapturedImage("");
    setDisableSubmit(false);
    setStreamStarted(true);
    setDisableStartBtn(true);
    setDisableCaptureBtn(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera Error:", error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageDataUrl = canvasRef.current.toDataURL("image/png");
      setCapturedImage(imageDataUrl);

      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setStreamStarted(false);
      }
      setStartBtnLabel("Retake");
      setDisableCaptureBtn(true);
      setDisableStartBtn(false);
    }
  };

  const submitImage = async () => {
    setDisableSubmit(true);
    image(capturedImage.split(",")[1]);
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: 5,
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!streamStarted && capturedImage && (
                <>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    style={{ borderRadius: "10px" }}
                  />
                </>
              )}
              {!streamStarted && !capturedImage && (
                <>
                  <img
                    src={faceId}
                    alt="image"
                    style={{
                      padding: "7%",
                      maxWidth: "100%",
                      height: "150px",
                    }}
                  />
                </>
              )}
              {streamStarted && !capturedImage && (
                <>
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{
                        height: "300px",
                        borderRadius: "10px",
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      style={{ display: "none" }}
                      height="300"
                      width="400"
                    />
                  </>
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={startCamera}
              className={disableStartBtn ? "btn-color-disabled" : "btn-color"}
              disabled={disableStartBtn}
              fullWidth
            >
              {startBtnLabel}
            </Button>
          </Grid>
          <Grid item xs={4}>
            {!capturedImage ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={captureImage}
                  disabled={disableCaptureBtn}
                  className={
                    disableCaptureBtn ? "btn-color-disabled" : "btn-color"
                  }
                  fullWidth
                >
                  Capture
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitImage}
                  disabled={disableSubmit}
                  className={disableSubmit ? "btn-color-disabled" : "btn-color"}
                  fullWidth
                >
                  Submit
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
      <div
        style={{
          fontFamily: "NeoSansStdLight",
          fontStyle: "italic",
          fontSize: "0.8rem",
          textAlign: "center",
          padding: "2%",
        }}
      >
        Face ID Icon by Pamela from{" "}
        <a
          href="https://thenounproject.com/browse/icons/term/face-id/"
          target="_blank"
          title="Face ID Icons"
        >
          Noun Project
        </a>{" "}
        (CC BY 3.0)
      </div>
    </Container>
  );
};

export default CameraCapture;
