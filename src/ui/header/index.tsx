import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#b6ccd8",
  boxShadow: 'none',
});

type Props = {
  title: string;
};

function Header({ title }: Props) {
  return (
    <CustomAppBar position="static">
      <Typography variant="h1" p={1}>{title}</Typography>
    </CustomAppBar>
  );
}

export default Header;
