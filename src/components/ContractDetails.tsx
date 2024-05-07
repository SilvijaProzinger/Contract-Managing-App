import { Container } from "@mui/material";
import Header from "./Header";

const ContractDetails = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Header
        title={"Contract Details"}
      />
    </Container>
  );
};

export default ContractDetails;
