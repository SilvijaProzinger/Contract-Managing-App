import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
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

  const handleDelete = () => {
    deleteContract(contractId)
    onClose();
  };

  return (
    <Dialog open={isDeleteModalOpen} onClose={onClose}>
      <DialogTitle>Delete contract</DialogTitle>
      <DialogContentText px={3}>
        Are you sure you want to delete contract number {contractNumber}?
      </DialogContentText>
      <DialogActions sx={{ margin: "1rem 1rem 1rem 0" }}>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteContract;
