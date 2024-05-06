import { Stack } from "@mui/material";
import { Contract } from "../types/types";
import { useContractsStore } from "../store/contractsStore";
import ContractListItem from "./ContractListItem";

const ContractList = () => {
  const { contracts } = useContractsStore();
  return (
    <Stack spacing={2}>
      {contracts.map((contract: Contract) => (
        <ContractListItem key={contract.id} contract={contract}/>
      ))}
    </Stack>
  );
};

export default ContractList;
