import { Container } from "@mui/material";
import Header from "../ui/header";
import ContractList from "./ContractList";

type Props = {
  loading: boolean;
  error: Error | null;
};

const Dashboard = ({ loading, error }: Props) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error has occured. Please refresh the page and try again.</p>;
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Header title={"Contracts"} />
      <Container maxWidth="lg" sx={{ p: 3 }}>
        <ContractList />
      </Container>
    </Container>
  );
};

export default Dashboard;
