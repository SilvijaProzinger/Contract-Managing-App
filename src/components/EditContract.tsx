import React, { useCallback, useEffect, useState } from "react";
import { useContractsStore } from "../store/contractsStore";
import { Contract } from "../types/types";
import EditContractForm from "./EditContractForm";

type Props = {
  contractId: number;
  isEditModalOpen: boolean;
  onClose: () => void;
};

const contractsUrl = process.env.REACT_APP_CONTRACTS_URL ?? "";

const EditContract = ({ contractId, isEditModalOpen, onClose }: Props) => {
  const { getContractById, updateContract } = useContractsStore();
  const contract = (getContractById as (id: number) => Contract)(contractId); // select the right contract object from the state by its id

  const [editedContract, setEditedContract] = useState<Contract>(contract);
  const [invalidStatus, setInvalidStatus] = useState(false);
  const [dateError, setDateError] = useState(false);

  const validateStatusChange = useCallback(
    (newStatus: string) => {
      if (newStatus === "") setInvalidStatus(true);
      if (newStatus !== editedContract?.status) {
        if (
          (editedContract?.status === "KREIRANO" && newStatus === "NARUČENO") ||
          (editedContract?.status === "NARUČENO" && newStatus === "ISPORUČENO")
        ) {
          setInvalidStatus(false);
        } else {
          setInvalidStatus(true);
        }
      }
    },
    [editedContract?.status]
  );

  useEffect(() => {
    validateStatusChange(editedContract.status);
  }, [validateStatusChange, editedContract.status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedContract(
      (prevContract): Contract => ({
        ...prevContract,
        [name]: value,
      })
    );
  };

  const handleUpdateContract = async (updatedContract: Contract) => {
    updateContract(updatedContract);
    try {
      await fetch(`${contractsUrl}/${updatedContract.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedContract),
      });
    } catch (error) {
      console.error("Failed to update contract:", error);
    }
  };

  
  const checkDateValidity = () => {
    const akontacijaDate = new Date(editedContract.datum_akontacije);
    const isporukaDate = new Date(editedContract.rok_isporuke);
    if (akontacijaDate > isporukaDate) {
      setDateError(true);
      return;
    } else setDateError(false);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedContract && !invalidStatus && !dateError) {
      handleUpdateContract(editedContract);
      onClose();
    }
  };

  return (
    <EditContractForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isEditModalOpen={isEditModalOpen}
      onClose={onClose}
      contract={contract}
      editedContract={editedContract}
      invalidStatus={invalidStatus}
      dateError={dateError}
      checkDateValidity={checkDateValidity}
    />
  );
};

export default EditContract;
