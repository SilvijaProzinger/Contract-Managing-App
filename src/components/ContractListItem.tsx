import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Typography, Box, Button, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Contract } from "../types/types";
import StatusBadge from "./StatusBadge";
import EditContract from "./EditContract";
import { convertDate } from "../utils/convertDate";

type Props = {
  contract: Contract;
};

const ContractListItem = ({ contract }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flex: "1 1 50%" }}>
          <Typography variant="h6" pb={1}>
            {contract.kupac}
          </Typography>
          <Typography>Broj ugovora: {contract.broj_ugovora}</Typography>
          <Typography>
            Datum isporuke: {convertDate(contract.rok_isporuke)}
          </Typography>
        </Box>
        <StatusBadge status={contract.status} />
      </Box>
      <Link
        component={RouterLink}
        to={`/contract/${contract.id}`}
        color="primary"
        underline="always"
        fontWeight={600}
        sx={{ display: "flex", alignContent: "center", marginTop: "1rem" }}
      >
        View contract details
        <ArrowForwardIcon />
      </Link>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={openEditModal}>
          Edit contract
        </Button>
      </Box>
      <EditContract
        contractId={contract.id}
        isEditModalOpen={isEditModalOpen}
        onClose={closeEditModal}
      />
    </Card>
  );
};

export default ContractListItem;
