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

type Props = {
  isNewModalOpen: boolean;
  onClose: () => void;
  newContractData: Contract;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
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
          label={t("depositionDate")}
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
          {t("cancelButton")}
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {t("saveButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewContractForm;
