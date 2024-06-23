import { useState } from "react";
import { Contract } from "../types/types";
import { useContractsStore } from "../store/contractsStore";
import AddNewContractForm from "./AddNewContractForm";

const contractsUrl = process.env.REACT_APP_CONTRACTS_URL ?? "";

type Props = {
  isNewModalOpen: boolean;
  onClose: () => void;
};

const AddNewContract = ({ isNewModalOpen, onClose }: Props) => {
  const { addContract, contracts } = useContractsStore();
  const lastId =
    contracts && contracts.length > 0 ? contracts[contracts.length - 1].id : 0;

  const contractDataInitial = {
    id: lastId + 1,
    kupac: "",
    broj_ugovora: "",
    datum_akontacije: "",
    rok_isporuke: "",
    status: "KREIRANO",
  };

  const [newContractData, setNewContractData] = useState<Contract>(
    contractDataInitial
  );
  const [dateError, setDateError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContractData({
      ...newContractData,
      [name]: value,
    });
  };

  const handleAddNewContract = async (newContract: Contract) => {
    try {
      const req = await fetch(contractsUrl, {
        method: "POST",
        body: JSON.stringify(newContract),
      });
      if (req.status === 200) {
        setNewContractData(contractDataInitial);
      }
    } catch (error) {
      console.error("Failed to add new contract:", error);
    }
  };

  const checkDateValidity = () => {
    const akontacijaDate = new Date(newContractData.datum_akontacije);
    const isporukaDate = new Date(newContractData.rok_isporuke);
    if (akontacijaDate > isporukaDate) {
      setDateError(true);
      return;
    } else setDateError(false);
  };

  const resetForm = () => {
    setNewContractData(contractDataInitial);
    setDateError(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkDateValidity();
    if (!dateError) {
      addContract(newContractData);
      //handleAddNewContract(newContractData);
      resetForm();
    }
  };

  return (
    <AddNewContractForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      newContractData={newContractData}
      isNewModalOpen={isNewModalOpen}
      onClose={onClose}
      dateError={dateError}
    />
  );
};

export default AddNewContract;
