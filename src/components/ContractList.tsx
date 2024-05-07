import { useState, useEffect } from "react";
import { Stack, Button, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Contract } from "../types/types";
import { useContractsStore } from "../store/contractsStore";
import ContractListItem from "./ContractListItem";
import AddNewContract from "./AddNewContract";

type Props = {
  filters: string[];
};

const ContractList = ({ filters }: Props) => {
  const { contracts } = useContractsStore();
  const [isNewModalOpen, setIsNewModal] = useState(false);
  const [filteredContractList, setFilteredContractList] = useState([]);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // filter the contracts list based on selected filters
  useEffect(() => {
    if (filters.length > 0) {
      const statusFilter = contracts.filter((contract: Contract) => {
        if (filters.includes("aktivan")) {
          return (
            contract.status === "KREIRANO" || contract.status === "NARUČENO"
          );
        } else if (filters.includes("neaktivan")) {
          return contract.status === "ISPORUČENO";
        } else {
          return contract.status;
        }
      });

      const filteredList = contracts.filter((contract: Contract) => {
        console.log("STATUS", statusFilter);
        return (
          filters.includes(contract.kupac) || contract.status === statusFilter
        );
      });
      setFilteredContractList(filteredList);
    } else {
      setFilteredContractList(contracts);
    }
  }, [contracts, filters]);

  useEffect(() => {
    console.log(filteredContractList);
  }, [filteredContractList]);

  const handleOpenNewModal = () => {
    setIsNewModal(true);
  };

  const handleCloseNewModal = () => {
    setIsNewModal(false);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        marginLeft: isDesktop ? '100px' : 0
      }}
    >
      <Stack spacing={4}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: "fit-content" }}
          onClick={handleOpenNewModal}
        >
          Add new contract
        </Button>
        {filteredContractList.map((contract: Contract) => (
          <ContractListItem key={contract.id} contract={contract} />
        ))}
      </Stack>
      <AddNewContract
        isNewModalOpen={isNewModalOpen}
        onClose={handleCloseNewModal}
      />
    </Container>
  );
};

export default ContractList;
