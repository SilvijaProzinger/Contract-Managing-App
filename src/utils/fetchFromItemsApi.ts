import { Items } from "../types/types";
import items from "../api/items.json";

// helper function to fetch from the mock items api
export const fetchItems = () => {
  return new Promise<any[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(items);
      reject(new Error("Failed to fetch items data"));
    }, 1000);
  });
};
