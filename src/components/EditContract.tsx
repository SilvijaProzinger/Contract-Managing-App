import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useContractsStore } from "../store/contractsStore";
import { Contract } from "../types/types";

type Props = {
  contractId: number;
  isEditModalOpen: boolean;
  onClose: () => void;
};

const EditContract = ({ contractId, isEditModalOpen, onClose }: Props) => {
  const { getContractById, updateContract, contracts } = useContractsStore();
  const contract = (getContractById as (id: number) => Contract)(contractId); // select the right contract object from the state by its id

  const [editedContract, setEditedContract] = useState<Contract>(contract);
  const [invalidStatus, setInvalidStatus] = useState(false);

  const validateStatusChange = useCallback(
    (newStatus: string) => {
      if (newStatus === "") setInvalidStatus(true);
      if (newStatus !== editedContract?.status) {
        if (
          (editedContract?.status === "KREIRANO" && newStatus === "NARUČENO") ||
          (editedContract?.status === "NARUČENO" && newStatus === "ISPORUČENO")
        ) {
          setInvalidStatus(false);
        } else {
          setInvalidStatus(true);
        }
      }
    },
    [editedContract?.status]
  );

  useEffect(() => {
    validateStatusChange(editedContract.status);
  }, [validateStatusChange, editedContract.status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedContract(
      (prevContract): Contract => ({
        ...prevContract,
        [name]: value,
      })
    );
  };

  const handleSubmit = () => {
    if (editedContract && !invalidStatus) {
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
        {contract?.status !== "ISPORUČENO" && (
          <TextField
            margin="dense"
            id="rok_isporuke"
            name="rok_isporuke"
            label="Rok isporuke"
            fullWidth
            value={editedContract?.rok_isporuke || ""}
            onChange={handleInputChange}
            InputProps={{
              inputProps: {
                pattern: "\\d{4}-\\d{2}-\\d{2}",
                title: "Date must be in YYYY-MM-DD format",
              },
              startAdornment: (
                <InputAdornment position="start">(YYYY-MM-DD)</InputAdornment>
              ),
            }}
          />
        )}
        <TextField
          margin="dense"
          id="status"
          name="status"
          label="Status"
          error={invalidStatus}
          helperText={invalidStatus ? "Please enter a valid status change" : ""}
          fullWidth
          value={editedContract?.status || ""}
          onChange={handleInputChange}
        />
      </DialogContent>
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
