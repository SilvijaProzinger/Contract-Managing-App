import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import ContractList from "./ContractList";
import FilterList from "./FilterList";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  loading: boolean;
  error: Error | null;
};

const Dashboard = ({ loading, error }: Props) => {
  const [open, setOpen] = useState(false);
  //const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [filters, setFilters] = useState<string[]>([]);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { t } = useTranslation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const filterContracts = (appliedFilters: string[]) => {
    setFilters(appliedFilters);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ position: "relative", minHeight: "100vh" }}
    >
      <Header
        title={t('contractsTitle')}
        isDesktop={isDesktop}
        toggleDrawer={toggleDrawer}
      />
      <FilterList
        isDesktop={isDesktop}
        open={open}
        toggleDrawer={toggleDrawer}
        filterContracts={filterContracts}
      />
      {loading && <CircularProgress />}
      {error ? (
        <Typography variant="h3">{t("errorHome")}</Typography>
      ) : (
        <Container
          maxWidth="md"
          sx={{ p: 4, marginLeft: isDesktop ? "22rem" : 0 }}
        >
          <ContractList filters={filters} />
        </Container>
      )}
    </Container>
  );
};

export default Dashboard;
