import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Dashboard from "./components/Dashboard";
import ContractDetails from "./components/ContractDetails";
import { useContractsStore } from "./store/contractsStore";
import { Contract } from "./types/types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";
import "./App.css";
import "@fontsource/lato";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f4f1",
    },
    primary: {
      main: "#1476d2",
    },
    secondary: {
      main: "#ba000d",
    },
    text: {
      primary: "#1d1c1c",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Lato",
    },
    h1: {
      fontSize: "2.5rem",
      color: "#14497b",
    },
    h2: {
      fontSize: "2rem",
      color: "#14497b",
    },
  },
});

const contractsUrl = process.env.REACT_APP_CONTRACTS_URL ?? "";

function App() {
  const { setContracts } = useContractsStore();
  const { data: contractsData, loading, error } = useFetch(contractsUrl);

  useEffect(() => {
    // if the data was successfully fetched update the contracts store
    if (contractsData) {
      setContracts(contractsData as Contract[]);
    }
  }, [setContracts, contractsData]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Dashboard loading={loading} error={error} />}
            />
            <Route path="/contract/:id" element={<ContractDetails />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
