import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  FormControl,
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
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
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
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%" }}>
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
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
            )}
            <TextField
              margin="dense"
              id="status"
              name="status"
              label="Status"
              error={invalidStatus}
              helperText={
                invalidStatus ? "Please enter a valid status change" : ""
              }
              fullWidth
              value={editedContract?.status || ""}
              onChange={handleInputChange}
              required
            />
          </DialogContent>
          <DialogActions sx={{ margin: "0 1rem 1rem 0" }}>
            <Button onClick={onClose} variant="outlined">
              {t("closeButton")}
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

export default EditContractForm;
