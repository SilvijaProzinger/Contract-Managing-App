import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import Dashboard from "./components/Dashboard";
import { useContractsStore } from "./store/contractsStore";
import { fetchContracts } from "./utils/fetchFromContractsApi";
import { Contract } from "./types/types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material/';
import "./App.css";
import "@fontsource/lato";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f4f1",
    },
    primary: {
      main: "#00668c",
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
      fontSize: "3rem",
      color: "#313d44",
    },
  },
});

function App() {
  const { setContracts } = useContractsStore();
  const { data: contracts, loading, error } = useFetch(fetchContracts); // call custom fetching hook and pass the mock api call we want

  useEffect(() => {
    // if the data was successfully fetched update the contracts store
    if (contracts) {
      setContracts(contracts as Contract[]);
    }
  }, [setContracts, contracts]);

  useEffect(() => {
    console.log(contracts);
  }, [contracts]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard loading={loading} error={error} />
      </ThemeProvider>
    </>
  );
}

export default App;
