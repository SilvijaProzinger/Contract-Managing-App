import { create } from "zustand";
import { Contract, ContractsState} from '../types/types'

const useContractsStore = create<ContractsState>((set) => ({
  contracts: [],
  setContracts: (newContracts: Contract[]) => set({ contracts: newContracts }),
  addContract: (newContract: Contract) =>
    set((state: ContractsState) => ({
      contracts: [...state.contracts, newContract],
    })),
  updateContract: (updatedContract: any) =>
    set((state: ContractsState) => ({
      contracts: state.contracts.map((contract: Contract) =>
        contract.id === updatedContract.id ? updatedContract : contract
      ),
    })),
}));

export { useContractsStore };
