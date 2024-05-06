import { Card, Typography, Box, Button } from "@mui/material";
import { Contract } from "../types/types";
import StatusBadge from "./StatusBadge";
import { useState } from "react";
import EditContract from "./EditContract";

type Props = {
  contract: Contract;
};

const ContractListItem = ({ contract }: Props) => {
  const convertDate = (deliveryDate: string) => {
    const parts = deliveryDate.split("-"); // rearrange contract delivery date to european format
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

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
      <Box sx={{ width: "fit-content", mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={openEditModal}>
          Edit
        </Button>
        <Button variant="contained" color="primary" sx={{ ml: 1 }}>
          View
        </Button>
      </Box>
      <EditContract contractId={contract.id} isEditModalOpen={isEditModalOpen} onClose={closeEditModal} />
    </Card>
  );
};

export default ContractListItem;
