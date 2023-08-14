import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import axios from "axios";

import "./App.css";
import "./font/NeoSansBlack.otf";
import "./font/NeoSansBlackItalic.otf";
import "./font/NeoSansLightItalic.otf";
import "./font/NeoSansMediumItalic.otf";
import "./font/NeoSansStdBold.otf";
import "./font/NeoSansStdLight.otf";
import "./font/NeoSansStdRegular.otf";

function App() {
  axios.defaults.headers.common = {
    "X-API-Key": process.env.REACT_APP_AWS_API_KEY,
  };

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
