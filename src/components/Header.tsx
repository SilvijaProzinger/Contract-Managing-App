import { AppBar, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
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
      {shouldShowFilterButton && <Button onClick={toggleDrawer}>Filter</Button>}
      <Typography variant="h1" p={1}>
        {title}
      </Typography>
    </CustomAppBar>
  );
};

export default Header;
