import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import StatusBadge from "./StatusBadge";

type Props = {
  naziv: string;
  dobavljac: string;
  status: string;
};

const BoxCustom = styled(Paper)((Box) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: '1rem'
}));

const ContractItems = ({ naziv, dobavljac, status }: Props) => {
  return (
    <BoxCustom variant="outlined">
      <Box>
        <Typography pb={1} fontWeight={600}>
          {naziv}
        </Typography>
        <Typography>Dobavljač: {dobavljac}</Typography>
      </Box>
      <StatusBadge status={status} />
    </BoxCustom>
  );
};

export default ContractItems;
