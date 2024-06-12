import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import ContractList from "./ContractList";
import FilterContracts from "./FilterContracts";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  loading: boolean;
  error: Error | null;
};

const Dashboard = ({ loading, error }: Props) => {
  const [open, setOpen] = useState(false);
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
        title={t("contractsTitle")}
        isDesktop={isDesktop}
        toggleDrawer={toggleDrawer}
      />
      <FilterContracts
        isDesktop={isDesktop}
        open={open}
        toggleDrawer={toggleDrawer}
        filterContracts={filterContracts}
      />
      {loading && <CircularProgress />}
      <Container
        maxWidth="md"
        sx={{ p: 4, marginLeft: isDesktop ? "22rem" : 0 }}
      >
        {error ? (
          <Typography variant="h4">{t("errorHome")}</Typography>
        ) : (
          <ContractList filters={filters} />
        )}
      </Container>
    </Container>
  );
};

export default Dashboard;
