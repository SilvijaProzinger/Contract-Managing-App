import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Typography, Box, Button, Link, Skeleton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import { Contract } from "../types/types";
import StatusBadge from "./StatusBadge";
import EditContract from "./EditContract";
import { convertDate } from "../utils/convertDate";
import DeleteContract from "./DeleteContract";

const GradientButtonPrimary = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #1476d2, #87d0ef)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(to right, #87d0ef, #1476d2)",
  },
}));

const GradientButtonError = styled(Button)(({ theme }) => ({
  "&:hover": {
    background: 'linear-gradient(to right, #ba000d, #f44336)',
    color: '#fff'
  },
}));

type Props = {
  contract: Contract;
};

const ContractListItem = ({ contract }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (contract) setIsLoading(false);
  }, [contract]);

  return isLoading ? (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={220}
      animation="wave"
    />
  ) : (
    <Card
      raised
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
          <Typography>Contract number: {contract.broj_ugovora}</Typography>
          <Typography>
            Date of delivery: {convertDate(contract.rok_isporuke)}
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
      <Box sx={{ mt: 3, display: "flex" }}>
        <GradientButtonPrimary
          variant="contained"
          onClick={openEditModal}
          sx={{ marginRight: "1rem" }}
        >
          Edit
        </GradientButtonPrimary>
        <GradientButtonError onClick={openDeleteModal} color='secondary' variant="outlined">
          Delete
        </GradientButtonError>
      </Box>
      <EditContract
        contractId={contract.id}
        isEditModalOpen={isEditModalOpen}
        onClose={closeEditModal}
      />
      <DeleteContract
        contractId={contract.id}
        contractNumber={contract.broj_ugovora}
        isDeleteModalOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      />
    </Card>
  );
};

export default ContractListItem;
