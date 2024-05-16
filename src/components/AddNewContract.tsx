import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Contract } from "../types/types";
import { useContractsStore } from "../store/contractsStore";

const contractsUrl = process.env.REACT_APP_CONTRACTS_URL ?? "";

type Props = {
  isNewModalOpen: boolean;
  onClose: () => void;
};

const AddNewContract = ({ isNewModalOpen, onClose }: Props) => {
  const { addContract, contracts } = useContractsStore();
  const lastId =
    contracts && contracts.length > 0 ? contracts[contracts.length - 1].id : 0;

  const contractDataInitial = {
    id: lastId + 1,
    kupac: "",
    broj_ugovora: "",
    datum_akontacije: "",
    rok_isporuke: "",
    status: "KREIRANO",
  };

  const { t } = useTranslation();

  const [newContractData, setNewContractData] = useState<Contract>(
    contractDataInitial
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContractData({
      ...newContractData,
      [name]: value,
    });
  };

  const handleAddNewContract = async (newContract: Contract) => {
    try {
      const req = await fetch(contractsUrl, {
        method: "POST",
        body: JSON.stringify(newContract),
      });
      if (req.status === 200) {
        setNewContractData(contractDataInitial);
      }
    } catch (error) {
      console.error("Failed to add new contract:", error);
    }
  };

  const handleSubmit = () => {
    addContract(newContractData);
    handleAddNewContract(newContractData);
    onClose();
  };

  return (
    <Dialog open={isNewModalOpen} onClose={onClose}>
      <DialogTitle>{t('addNewTitle')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="kupac"
          name="kupac"
          label="Buyer"
          fullWidth
          value={newContractData.kupac}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="broj_ugovora"
          name="broj_ugovora"
          label="Contract number"
          fullWidth
          value={newContractData.broj_ugovora}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="rok_isporuke"
          name="rok_isporuke"
          label="Date of delivery"
          fullWidth
          value={newContractData.rok_isporuke}
          onChange={handleInputChange}
          required
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
        <TextField
          margin="dense"
          id="datum_akontacije"
          name="datum_akontacije"
          label="Date of deposition"
          fullWidth
          value={newContractData.datum_akontacije}
          onChange={handleInputChange}
          required
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
      </DialogContent>
      <DialogActions sx={{ margin: "0 1rem 1rem 0" }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewContract;
