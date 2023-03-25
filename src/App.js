/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React from "react";
import { createTheme, NextUIProvider, Navbar, Text } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./App.css";
import PatientView from "./Components/PatientView/PatientView";
import PatientEncounter from "./Components/PatientEncounter/PatientEncounter";
import EncounterViewer from "./Components/EncounterViewer/EncounterViewer";
import Queue from "./Components/Queue/Queue";

import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
// import axios from 'axios';
const darkTheme = createTheme({
  type: "light",
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
      }}
    >
      <NextUIProvider theme="dark">
        <Router>
          <div>
            <Navbar isBordered variant="sticky">
              <Navbar.Brand>
                <Text b color="inherit" hideIn="xs">
                  MEDS
                </Text>
              </Navbar.Brand>
              <Navbar.Content>
                <Navbar.Link href="/">Patient View</Navbar.Link>
                <Navbar.Link href="/queue">Queue</Navbar.Link>
              </Navbar.Content>
            </Navbar>
          </div>
          <Routes>
            <Route path="/" element={<PatientView />} />
            <Route path=":patientId/encounters/">
              <Route index element={<EncounterViewer />} />
              <Route path=":encounterId" element={<PatientEncounter />} />
            </Route>
            <Route path="/queue" element={<Queue />} />
          </Routes>
        </Router>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default App;
