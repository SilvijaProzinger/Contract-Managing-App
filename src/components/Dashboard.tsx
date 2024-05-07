import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import ContractList from "./ContractList";
import FilterList from "./FilterList";

type Props = {
  loading: boolean;
  error: Error | null;
};

const Dashboard = ({ loading, error }: Props) => {
  const [open, setOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [filters, setFilters] = useState<string[]>([])

  // check window width to apply appropriate filter drawer variant
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const filterContracts = (appliedFilters: string[]) => {
    setFilters(appliedFilters)
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error has occured. Please refresh the page and try again.</p>;
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Header
        title={"Contracts"}
        screenWidth={screenWidth}
        toggleDrawer={toggleDrawer}
      />
      <FilterList
        screenWidth={screenWidth}
        open={open}
        toggleDrawer={toggleDrawer}
        filterContracts={filterContracts}
      />
      <Container maxWidth="lg" sx={{ p: 3 }}>
        <ContractList filters={filters}/>
      </Container>
    </Container>
  );
};

export default Dashboard;
