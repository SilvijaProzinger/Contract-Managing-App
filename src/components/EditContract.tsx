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
import { useTranslation } from "react-i18next";
import { useContractsStore } from "../store/contractsStore";
import { Contract } from "../types/types";

type Props = {
  contractId: number;
  isEditModalOpen: boolean;
  onClose: () => void;
};

const contractsUrl = process.env.REACT_APP_CONTRACTS_URL ?? "";

const EditContract = ({ contractId, isEditModalOpen, onClose }: Props) => {
  const { getContractById, updateContract } = useContractsStore();
  const contract = (getContractById as (id: number) => Contract)(contractId); // select the right contract object from the state by its id

  const [editedContract, setEditedContract] = useState<Contract>(contract);
  const [invalidStatus, setInvalidStatus] = useState(false);

  const { t } = useTranslation();

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

  const handleUpdateContract = async (updatedContract: Contract) => {
    try {
      await fetch(`${contractsUrl}/${updatedContract.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedContract),
      });
      updateContract(updatedContract);
    } catch (error) {
      console.error("Failed to update contract:", error);
    }
  };

  const handleSubmit = () => {
    if (editedContract && !invalidStatus) {
      handleUpdateContract(editedContract);
      onClose();
    }
  };

  return (
    <Dialog open={isEditModalOpen} onClose={onClose}>
      <DialogTitle>{t("editTitle")}</DialogTitle>
      <DialogContentText px={3}>{t("editText")}</DialogContentText>
      <DialogContent>
        {contract?.status !== "ISPORUČENO" && (
          <TextField
            margin="dense"
            id="rok_isporuke"
            name="rok_isporuke"
            label={t("deliveryDate")}
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
      <DialogActions sx={{ margin: "0 1rem 1rem 0" }}>
        <Button onClick={onClose} variant="outlined">
          {t("closeButton")}
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {t("saveButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContract;
