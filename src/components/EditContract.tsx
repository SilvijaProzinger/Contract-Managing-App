import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useContractsStore } from "../store/contractsStore";
import { Contract } from "../types/types";

type Props = {
  contractId: number;
  isEditModalOpen: boolean;
  onClose: () => void;
};

const EditContract = ({ contractId, isEditModalOpen, onClose }: Props) => {
  const { getContractById, updateContract } = useContractsStore();
  const contract = getContractById(contractId); // select the right contract object from the state by its id

  const [editedContract, setEditedContract] = useState<Contract>(contract);
  const [statusWarning, setStatusWarning] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setStatusWarning("");
    // ensure the status can only be changed into accepted values
    if (name === "status") {
      if (value === "") {
        setEditedContract((prevContract) => ({
          ...prevContract,
          [name]: value,
        }));
      } else if (
        (editedContract.status === "KREIRANO" && value === "NARUČENO") ||
        (editedContract.status === "NARUČENO" && value === "ISPORUČENO")
      ) {
        setEditedContract((prevContract) => ({
          ...prevContract,
          status: value,
        }));
      } else {
        setStatusWarning(
          `An error has occurred. The status can't go from ${editedContract.status} to ${value}.`
        );
      }
    } else {
      setEditedContract((prevContract) => ({
        ...prevContract,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    if (editedContract) {
      // call the store method to update the selected contract
      updateContract(editedContract);
      onClose();
    }
  };

  return (
    <Dialog open={isEditModalOpen} onClose={onClose}>
      <DialogTitle>Edit contract</DialogTitle>
      <DialogContentText pl={3}>
        This is where you can edit delivery date or status.
      </DialogContentText>
      <DialogContent>
        <TextField
          margin="dense"
          id="rok_isporuke"
          name="rok_isporuke"
          label="Rok isporuke"
          fullWidth
          value={editedContract?.rok_isporuke || ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="status"
          name="status"
          label="Status"
          fullWidth
          value={editedContract?.status || ""}
          onChange={handleInputChange}
        />
      </DialogContent>
      {statusWarning && <Typography>{statusWarning}</Typography>}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContract;
