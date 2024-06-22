import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Contract } from "../types/types";
import React from "react";

type Props = {
  isNewModalOpen: boolean;
  onClose: () => void;
  newContractData: Contract;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AddNewContractForm = ({
  isNewModalOpen,
  onClose,
  newContractData,
  handleInputChange,
  handleSubmit,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isNewModalOpen} onClose={onClose}>
      <DialogTitle>{t("addNewTitle")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <DialogContent>
            <TextField
              margin="dense"
              id="kupac"
              name="kupac"
              label={t("buyer")}
              fullWidth
              value={newContractData.kupac}
              onChange={handleInputChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              id="broj_ugovora"
              name="broj_ugovora"
              label={t("contractNumber")}
              fullWidth
              value={newContractData.broj_ugovora}
              onChange={handleInputChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              id="rok_isporuke"
              name="rok_isporuke"
              label={t("deliveryDate")}
              fullWidth
              value={newContractData.rok_isporuke}
              onChange={handleInputChange}
              required
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              id="datum_akontacije"
              name="datum_akontacije"
              label={t("depositionDate")}
              fullWidth
              value={newContractData.datum_akontacije}
              onChange={handleInputChange}
              required
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions sx={{ margin: "0 1rem 1rem 0" }}>
            <Button onClick={onClose} variant="outlined">
              {t("cancelButton")}
            </Button>
            <Button type="submit" variant="contained">
              {t("saveButton")}
            </Button>
          </DialogActions>
        </FormControl>
      </form>
    </Dialog>
  );
};

export default AddNewContractForm;
