import { Contract } from "../types/types";
import contracts from "../api/contracts.json";

// helper function to fetch from the mock contracts api
export const fetchContracts = () => {
  return new Promise<Contract[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(contracts);
      reject(new Error("Failed to fetch contracts data"));
    }, 1000);
  });
};
