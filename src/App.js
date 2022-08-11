/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./App.css";
import PatientView from "./Components/PatientView/PatientView";
import Home from "./Components/Home/Home";
import Doctor from "./Components/Doctor/Doctor";
import PatientEncounter from "./Components/PatientEncounter/PatientEncounter";

import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
// import axios from 'axios';
const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

const noStyle = {
  listStyle: "none",
};

const customColor = (myColor) => ({
  background: myColor,
});

const App = () => {
  const [color, setColor] = useState("#ffffff");

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        dark: darkTheme.className,
      }}>
      <NextUIProvider theme="dark">
        <Router>
          <div>
            <input
              type="text"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}></input>
            <nav>
              <ul style={noStyle}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li style={customColor(color)}>
                  <Link to="/patient-view">Patients</Link>
                </li>
                <li>
                  <Link to="/i-am-doctor">I Am Doctor</Link>
                </li>
                <li>
                  <Link to="/patient-encounter">Patient Encounter</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="patient-view" element={<PatientView />} />
            <Route path="i-am-doctor" element={<Doctor />} />
            <Route path="patient-encounter" element={<PatientEncounter />} />
          </Routes>
        </Router>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default App;
