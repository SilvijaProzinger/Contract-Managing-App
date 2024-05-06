import { Card, Typography, Badge, Box } from "@mui/material";
import { Contract } from "../types/types";

type Props = {
  contract: Contract;
};

const ContractListItem = ({ contract }: Props) => {
  const getStatusColor = (status: string) => {
    if (status === "KREIRANO") {
      return "#4CAF50";
    } else if (status === "NARUČENO") {
      return "#FFC857";
    } else return "#cccbc8";
  };

  const convertDate = (deliveryDate: string) => {
    const parts = deliveryDate.split("-"); // rearrange contract delivery date to european format
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h6">{contract.kupac}</Typography>
        <Typography>{contract.broj_ugovora}</Typography>
        <Typography>{convertDate(contract.rok_isporuke)}</Typography>
      </Box>
      <Badge sx={{ bgcolor: getStatusColor(contract.status), p: 1 }}>
        {contract.status}
      </Badge>
    </Card>
  );
};

export default ContractListItem;
