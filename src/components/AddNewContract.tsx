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
import { Contract } from "../types/types";
import { useContractsStore } from "../store/contractsStore";

type Props = {
  isNewModalOpen: boolean;
  onClose: () => void;
};

const AddNewContract = ({ isNewModalOpen, onClose }: Props) => {
  const { addContract, contracts } = useContractsStore();

  let lastContractId = contracts[contracts.length - 1].id

  const [newContractData, setNewContractData] = useState<Contract>({
    id: ++lastContractId,
    kupac: "",
    broj_ugovora: "",
    datum_akontacije: "",
    rok_isporuke: "",
    status: "KREIRANO",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContractData({
      ...newContractData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(newContractData)
    addContract(newContractData);
    onClose();
  };

  return (
    <Dialog open={isNewModalOpen} onClose={onClose}>
      <DialogTitle>Add new contract</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="kupac"
          name="kupac"
          label="Kupac"
          fullWidth
          value={newContractData.kupac}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="broj_ugovora"
          name="broj_ugovora"
          label="Broj ugovora"
          fullWidth
          value={newContractData.broj_ugovora}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="rok_isporuke"
          name="rok_isporuke"
          label="Rok isporuke"
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
          label="Datum akontacije"
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
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewContract;
