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
import { Contract } from "../types/types";
import { useTranslation } from "react-i18next";

type Props = {
  isEditModalOpen: boolean;
  onClose: () => void;
  contract: Contract;
  editedContract: Contract;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalidStatus: boolean;
  handleSubmit: () => void;
};

const EditContractForm = ({
  isEditModalOpen,
  onClose,
  contract,
  editedContract,
  handleInputChange,
  invalidStatus,
  handleSubmit,
}: Props) => {
  const { t } = useTranslation();
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

export default EditContractForm;
