import { AppBar, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/material/styles";
import LanguageSelector from "./LanguageSelector";

const CustomAppBar = styled(AppBar)({
  background: "linear-gradient(to right, #1476d2, #87d0ef)",
  boxShadow: "0px 4px 10px 2px rgba(0, 0, 0, 0.1)",
  zIndex: "5",
  position: "relative",
});

type Props = {
  title: string;
  isDesktop?: boolean;
  toggleDrawer?: () => void;
};

const Header = ({ title, isDesktop, toggleDrawer }: Props) => {
  const isContractsPage = title === "Contracts" || title === "Ugovori";
  const shouldShowFilterButton = !isDesktop && isContractsPage;

  return (
    <CustomAppBar
      position="static"
      sx={{ marginLeft: isContractsPage && isDesktop ? "300px" : "0" }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent={isContractsPage ? "space-between" : "center"}
        ml={isContractsPage && isDesktop ? 7 : 0}
        maxWidth={isContractsPage && isDesktop ? 900 : "100%"}
      >
        {shouldShowFilterButton && (
          <Grid pl={3} item>
            <IconButton onClick={toggleDrawer}>
              <FilterListIcon />
            </IconButton>
          </Grid>
        )}
        <Grid item>
          <Typography variant="h1" p={2} color="#f5f4f1">
            {title}
          </Typography>
        </Grid>
        {isContractsPage && <LanguageSelector />}
      </Grid>
    </CustomAppBar>
  );
};

export default Header;
