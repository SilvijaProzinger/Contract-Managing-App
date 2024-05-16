import { create } from "zustand";
import { Contract, ContractsState } from "../types/types";

const useContractsStore = create<ContractsState>((set, get) => ({
  contracts: [],
  setContracts: (newContracts: Contract[]) => set({ contracts: newContracts }),
  addContract: (newContract: Contract) =>
    set((state: ContractsState) => ({
      contracts: [...state.contracts, newContract],
    })),
  updateContract: (updatedContract: Contract) =>
    set((state: ContractsState) => ({
      contracts: state.contracts.map((contract: Contract) =>
        contract.id === updatedContract.id ? updatedContract : contract
      ),
    })),
  deleteContract: (selectedContractId: number) =>
    set((state: ContractsState) => ({
      contracts: state.contracts.filter(
        (contract: Contract) => contract.id !== selectedContractId
      ),
    })),
  getContractById: (id: number) => {
    const contractsState = get().contracts;
    return contractsState.find((contract: Contract) => contract.id === id);
  },
}));

export { useContractsStore };
