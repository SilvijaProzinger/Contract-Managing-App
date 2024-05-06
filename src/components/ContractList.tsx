import { Stack, Button } from "@mui/material";
import { Contract } from "../types/types";
import { useContractsStore } from "../store/contractsStore";
import ContractListItem from "./ContractListItem";
import AddNewContract from "./AddNewContract";
import { useState } from "react";

const ContractList = () => {
  const { contracts } = useContractsStore();
  const [isNewModalOpen, setIsNewModal] = useState(false);

  const handleOpenNewModal = () => {
    setIsNewModal(true)
  }

  const handleCloseNewModal = () => {
    setIsNewModal(false);
  };

  return (
    <>
      <Stack spacing={4}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: "fit-content" }}
          onClick={handleOpenNewModal}
        >
          Add new contract
        </Button>
        {contracts.map((contract: Contract) => (
          <ContractListItem key={contract.id} contract={contract} />
        ))}
      </Stack>
      <AddNewContract
        isNewModalOpen={isNewModalOpen}
        onClose={handleCloseNewModal}
      />
    </>
  );
};

export default ContractList;
