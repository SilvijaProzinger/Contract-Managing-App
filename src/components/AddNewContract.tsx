import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { Contract } from "../types/types";
import { useContractsStore } from "../store/contractsStore";

type Props = {
  isNewModalOpen: boolean;
  onClose: () => void;
};

const AddNewContract = ({ isNewModalOpen, onClose }: Props) => {
  const { addContract } = useContractsStore();

  const [newContractData, setNewContractData] = useState<Contract>({
    id: 0,
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
    addContract(newContractData);
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
