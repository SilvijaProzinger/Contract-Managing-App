import { AppBar, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/material/styles";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#b6ccd8",
  boxShadow: "none",
  zIndex: '5',
  position: 'relative'
});

type Props = {
  title: string;
  isDesktop?: boolean;
  toggleDrawer?: () => void;
};

const Header = ({ title, isDesktop, toggleDrawer }: Props) => {
  const shouldShowFilterButton = !isDesktop && title === "Contracts";

  return (
    <CustomAppBar position="static">
      <Grid container alignItems="center">
        {shouldShowFilterButton && (
          <Grid pl={3} item>
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
