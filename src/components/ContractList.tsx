import { useState, useEffect } from "react";
import { Stack, Button, Container, Pagination } from "@mui/material";
import { Contract } from "../types/types";
import { useContractsStore } from "../store/contractsStore";
import { useTranslation } from "react-i18next";
import ContractListItem from "./ContractListItem";
import AddNewContract from "./AddNewContract";

type Props = {
  filters: string[];
};

const ContractList = ({ filters }: Props) => {
  const { contracts } = useContractsStore();
  const [isNewModalOpen, setIsNewModal] = useState(false);
  const [filteredContractList, setFilteredContractList] = useState<Contract[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { t } = useTranslation();

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
        return (
          filters.includes(contract.kupac) && statusFilter.includes(contract)
        );
      });
      setFilteredContractList(filteredList);
    } else {
      setFilteredContractList(contracts);
    }
  }, [contracts, filters]);

  const handleOpenNewModal = () => {
    setIsNewModal(true);
  };

  const handleCloseNewModal = () => {
    setIsNewModal(false);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginatedContracts = filteredContractList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container maxWidth={false} disableGutters>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: "fit-content", marginBottom: "2rem" }}
        onClick={handleOpenNewModal}
      >
        {t('addNewButton')}
      </Button>
      <Stack spacing={4} minHeight={700}>
        {paginatedContracts.map((contract: Contract) => (
          <ContractListItem key={contract.id} contract={contract} />
        ))}
      </Stack>
      <Pagination
        count={Math.ceil(filteredContractList.length / itemsPerPage)}
        color="primary"
        variant="outlined"
        page={currentPage}
        onChange={handleChangePage}
        sx={{ marginTop: "3rem" }}
      />
      <AddNewContract
        isNewModalOpen={isNewModalOpen}
        onClose={handleCloseNewModal}
      />
    </Container>
  );
};

export default ContractList;
