import { AppBar, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/material/styles";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#b6ccd8",
  boxShadow: "none",
});

type Props = {
  title: string;
  screenWidth: number;
  toggleDrawer: () => void;
};

const Header = ({ title, screenWidth, toggleDrawer }: Props) => {
  const shouldShowFilterButton = screenWidth < 1200 && title === "Contracts";

  return (
    <CustomAppBar position="static">
      <Grid container alignItems="center">
        {shouldShowFilterButton && (
          <Grid item>
            <IconButton onClick={toggleDrawer}>
              <FilterListIcon />
            </IconButton>
          </Grid>
        )}
        <Grid item>
          <Typography variant="h1" p={1}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </CustomAppBar>
  );
};

export default Header;
