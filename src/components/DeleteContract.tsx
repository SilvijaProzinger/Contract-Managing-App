import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useContractsStore } from "../store/contractsStore";

type Props = {
  contractId: number;
  contractNumber: string;
  isDeleteModalOpen: boolean;
  onClose: () => void;
};

const DeleteContract = ({
  contractId,
  contractNumber,
  isDeleteModalOpen,
  onClose,
}: Props) => {
  const { deleteContract } = useContractsStore();
  const { t } = useTranslation();

  const handleDelete = () => {
    deleteContract(contractId);
    onClose();
  };

  return (
    <Dialog open={isDeleteModalOpen} onClose={onClose}>
      <DialogTitle>{t("deleteTitle")}</DialogTitle>
      <DialogContentText px={3}>
        {t("deleteText")} {contractNumber}?
      </DialogContentText>
      <DialogActions sx={{ margin: "1rem 1rem 1rem 0" }}>
        <Button onClick={onClose} variant="outlined" color="error">
          {t("cancelButton")}
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          {t("deleteButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteContract;
