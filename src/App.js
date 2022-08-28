/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./App.css";
import PatientView from "./Components/PatientView/PatientView";
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

const App = () => {
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
            <nav>
              <ul style={noStyle}>
                <li>
                  <Link to="/">Patients</Link>
                </li>
                <li>
                  <Link to="/patient-encounter">Patient Encounter</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<PatientView />} />
            <Route path="patient-encounter" element={<PatientEncounter />} />
          </Routes>
        </Router>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default App;
